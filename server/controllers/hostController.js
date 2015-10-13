var Router = require('express').Router;
var Host = require('../database/models/Host');
var Visitor = require('../database/models/Visitor');

var router = new Router();

router.get('/exception-date', function(req, res, next) {
  var date = new Date(req.query.date).toString();
  var shouldBeFree = req.query.onoff === 'false';
  var hostid = req.query.host;
  console.log('QUERY: ', req.query, date, shouldBeFree, hostid);
  Host.findById(hostid, function(err, host) {
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
      return host.save(function(err, ret) {
        if (err) return next(err);
        res.send(ret);
      });
    }

    if (!host.MatchInfo.matches) host.MatchInfo.matches = [];

    var array = host.MatchInfo.exceptionDate;

    for (var i = 0, l = array.length; i < l; i++) {
      if (array[i].toString() === date) {
        break;
      }
    }

    if (i !== l) return next(new Error('This host is already taken on this date'));

    array.push(date);

    var matchArray = host.MatchInfo.matches;
    for (var i = 0, l = matchArray.length; i < l; i++) {
      if (matchArray[i].date.toString() === date) {
        break;
      }
    }

    if (i === l) return host.save(function(err, ret) {
      if (err) return next(err);
      res.send(ret);
    });

    var visitorId = matchArray.splice(i, 1)[0].visitor;

    console.log(visitorId, host._id);

    Visitor.findOne({'MatchInfo.matchHost':host._id}, function(err, visitor) {
      if (err) return next(err);
      if (!visitor) return next(new Error('visitor was not found'));
      console.log('found visitor');
      visitor.MatchInfo.matchHost = null;
      visitor.save(function(err, visitor) {
        if (err) return next(err);
        console.log('visitor update', visitor);
        host.save(function(err, ret) {
          if (err) return next(err);
          console.log('host save');
          res.send(ret);
        });
      });
    });
  });
});

router.use(require('./crudController')('hostProfile'));

module.exports = router;
