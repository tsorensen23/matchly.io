var crud = require('./crudController')('hostProfile');
var Host = require('../database/models/Host');
var Visitor = require('../database/models/Host');

crud.get('/exception-date', function(req, res, next) {
  var date = new Date(req.query.date).toString();
  var shouldBeFree = req.query.onoff;
  var hostid = req.query.host;
  Host.findOneById(hostid, function(err, host) {
    if (err) return next(err);
    if (!host) return next(new Error('the host does not exist'));
    if (shouldBeFree) {
      var array = host.MatchInfo.exceptionDate;
      for (var i = 0, l = array.length; i < l; i++) {
        if (array[i].toString() === date) {
          break;
        }
      }

      if (i === l) return next(new Error('This host is already free'));
      array.splice(i, 1);
      host.save(function(err, ret) {
        if (err) return next(err);
        res.send(ret);
      });
    }

    var matchArray = host.MatchInfo.matchDates;
    for (var i = 0, l = matchArray.length; i < l; i++) {
      if (matchArray[i].date.toString() === date) {
        break;
      }
    }

    var array = host.MatchInfo.exceptionDate;
    array.push(date);
    if (i === l) return host.save(function(err, ret) {
      if (err) return next(err);
      res.send(ret);
    });

    matchArray.splice(i, 1);
    Visitor.findOne({
      'MatchInfo.matchHost': hostid
    }, function(err, visitor) {
      if (err) return next(err);
      if (!visitor) return next(err);
      visitor.MatchInfo.matchHost = null;
      visitor.save(function(err, ret) {
        if (err) return next(err);
        host.save(function(err, ret) {
          if (err) return next(err);
          res.send(ret);
        });
      });
    });
  });
});

module.exports = crud;
