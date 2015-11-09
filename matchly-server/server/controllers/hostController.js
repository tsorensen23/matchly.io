var Router = require('express').Router;
var Host = require('../database/models/Host');
var Visitor = require('../database/models/Visitor');
var Availability = require('../database/models/Availability');
var async = require('async');

var router = new Router();

router.get('/exception-date', function(req, res, next) {
  var date = new Date(req.query.date).toString();
  var hasException = req.query.onoff === 'false';
  var hostid = req.query.host;

  var updated = {};

  var host;
  var visitor;
  async.series([
    function(next) {
      Host.findById(hostid, function(err, foundHost) {
        if (err) return next(err);
        if (!foundHost) return next(new Error('the host does not exist'));
        host = foundHost;
        next();
      });
    },

    function(next) {
      // If we shouldn't be free, go to the next function
      if (!hasException) return next();
      var array = host.MatchInfo.exceptionDate;
      for (var i = 0, l = array.length; i < l; i++) {
        if (array[i].toString() === date) {
          break;
        }
      }

      if (i === l) {
        return next(new Error('This host is already free'));
      }

      array.splice(i, 1);
      host.save(function(err, ret) {
        if (err) return next(err);
        updated.hosts = [ret];
        res.send({update:updated});
      });
    },

    function(next) {
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

      host.save(function(err, ret) {
        if (err) return next(err);
        updated.hosts = [ret];

        // If we have a matchfound, do the next function
        visitor = i;
        if (i < l) return next();
        res.send({update:updated});
      });

    },

    function(next) {
      var visitorId = host.MatchInfo.matches.splice(visitor, 1)[0].visitor;

      Visitor.findOneAndUpdate(
        {_id:visitorId},
        {'MatchInfo.matchHost':null},
        function(err, visitorObj) {
          if (err) return next(err);
          if (visitor.nModified === 0)
            return next(new Error('visitor was not found'));
          updated.visitors = [visitorObj];
          visitor = visitorObj;
          next();
        }
      );
    },

    function(next) {
      var updateKey = host.MatchInfo.Section + visitor.MatchInfo.classVisitNumber;

      Availability.findOne({}, updateKey + '.matches', function(err, array) {
        if (err) return next(err);
        var toUpdate = {};

        toUpdate[updateKey + '.matches'] = array[updateKey].matches.filter(function(item) {
          return item.visitor !== visitor._id;
        });

        Availability.findOneAndUpdate({}, toUpdate, function(err, availability) {
          if (err) return next(err);
          updated.availabilities = [availability];
          res.send({update:updated});
        });
      });
    }
  ], next);
});

router.use(require('./crudController')('hostProfile'));

module.exports = router;
