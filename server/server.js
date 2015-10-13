var cookieParser = require('cookie-parser');
var express = require('express');
var Hat = require('hat');
var app = express();
var matchController = require('./controllers/MatchController');
var userController = require('./controllers/userController');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var schoolController = require('./controllers/schoolController');
var crudController = require('./controllers/crudController');
var stdUIController = require('./controllers/stdUIController');
var path = require('path');

app.use(morgan('combined'));
app.use(cookieParser());

// app.use(function(req, res, next) {
//   if(req.cookies.matchlycookie===undefined) {
//     var hatNumber = Hat();
//     res.cookie('matchlycookie', hatNumber);
//   }
//   else {
//     console.log('cookie exists');
//   }
//   next();
// });
app.use(function(req, res, next) {
  if (req.method.toLowerCase() !== 'get') return next();
  if (path.extname(req.path)) return next();
  if (/\/$/.test(req.path)) return next();
  res.redirect(req.path + '/');
});

app.use(userController.authorizationCheck);
app.use('/login', stdUIController('login'));
app.use(function(req, res, next) {
  if (process.env.NODE_ENV != 'DEVELOPMENT') {
    if (!req.user) {
      return res.redirect('/login');
    }
  }

  next();
});

app.use('/', stdUIController('home'));
app.use('/assets', express.static(__dirname + './../assets'));
app.use(bodyParser.json({limit:1024 * 1024 * 20}));
app.post('/checkLogin', userController.cookieCheck);
app.post('/registerUser', userController.registerUser);
app.post('/userLogin', userController.checkLogin);

app.post('/submithosts', matchController.submithosts);
app.post('/submitvisitors', matchController.submitvisitors);
app.post('/availability', matchController.availability);
app.get('/match', matchController.rumble);
app.get('/getAvailableData', matchController.getAvailableData);
app.post('/headerOrder', matchController.getHeaderData);
app.post('/updateHeaderOrder', matchController.updateHeaderOrder);
app.post('/checkschools', schoolController.checkAlias);
app.post('/schoolmatch', schoolController.schoolMatch);
app.get('/schools', schoolController.getSchools);
app.use('/hosts', schoolController.middleWare, require('./controllers/hostController'));
app.use('/visitors', schoolController.middleWare, crudController('visitorProfile'));

app.use(function(err, req, res, next) {
  console.error('route error', err.message, err.stack);
  next(err);
});

var Server = require('http').Server;

var server = new Server(app);

server.listen(process.env.PORT || 3000, function() {
  console.log('listening and running');
  if (process.send) process.send('ready');
});

server.express = app;

module.exports = server;
