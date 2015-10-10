var Router = require('express').Router;
var path = require('path');
var __root = path.resolve(__dirname, '../..');

module.exports = function(name) {
  var router = new Router();
  router.get('/', function(req, res) {
    res.sendFile(__root + '/client/' + name + '/index.html');
  });

  router.get('/style.css', function(req, res) {
    res.sendFile(__root + '/client/' + name + '/style.css');
  });

  router.get('/index.js', function(req, res) {
    res.sendFile(__root + '/build/' + name + '-bundle.js');
  });

  return router;
};
