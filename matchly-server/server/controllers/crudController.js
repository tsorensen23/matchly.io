var Router = require('express').Router;
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var mpath = require('mpath');

console.warn('BEFORE MOVING TO PRODUCTION, ENSURE WE STOP REMOVING ALL ITEMS');

module.exports = function(modelName) {
  var model = mongoose.model(modelName);
  var router = new Router();
  router.get('/', function(req, res, next) {
    var obj = req.query;
    for (var i in req.crudExtra) {
      obj[i] = req.crudExtra;
    }

    model.find(obj, function(err, list) {
      if (err) return next(err);
      res.send(list);
    });
  });

  router.post('/', bodyParser(), function(req, res, next) {

    var ari = !Array.isArray(req.body) ? [req.body] : req.body;
    ari.forEach(function(obj) {
      for (var i in req.crudExtra) {
        mpath.set(i, req.crudExtra[i], obj);
      }
    });

    model.find({}).remove().exec(function(err, data) {
      model.create(ari, function(err, doc) {
        if (err) return next(err);
        res.send(doc);
      });
    });
  });

  router.param('id', function(req, res, next, id) {
    model.findById(id, function(err, doc) {
      if (err) return next(err);
      if (!doc) return res.status(404).end();
      req.doc = doc;
      next();
    });
  });

  router.get('/:id', function(req, res, next) {
    res.send(req.doc);
  });

  router.post('/:id', bodyParser(), function(req, res, next) {
    var obj = req.body;
    for (var i in req.crudExtra) {
      obj[i] = req.crudExtra;
    }

    for (var i in obj) {
      mpath.set(i, obj[i], req.doc);
    }

    req.doc.save(function(err, doc) {
      if (err) return next(err);
      res.send(doc);
    });
  });

  return router;
};

