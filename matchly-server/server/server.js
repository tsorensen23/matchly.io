var cookieParser = require('cookie-parser');
var express = require('express');
var Hat = require('hat');
var FileStreamRotator = require('file-stream-rotator');
var app = express();
var fs= require('fs');
var matchController = require('./controllers/MatchController');
var userController = require('./controllers/userController');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var schoolController = require('./controllers/schoolController');
var crudController = require('./controllers/crudController');
var employerController = require('./controllers/employerController');
var stdUIController = require('./controllers/stdUIController');
var path = require('path');
var Employer = require('./database/db').Employer;
var db = require('./database/db');
var calendarController = require('./controllers/calendarController');



if(process.env.NODE_ENV == 'production'){
var logDirectory = __dirname + '/log'

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false,
  date_format: "YYYY-MM-DD"
})
  app.use(morgan('combined', {stream: accessLogStream}))
} else {
  app.use(morgan('dev'));
}
app.use(cookieParser());
app.disable('x-powered-by');
app.disable('etag')

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
  next();
});

app.use(userController.authorizationCheck);
app.use('/login', stdUIController('login'));
app.get('/logout', userController.logout);
app.use(bodyParser.json({limit:1024 * 1024 * 20}));
app.post('/userLogin', userController.checkLogin);
app.use('/assets', express.static(__dirname + './../assets'));
app.use(function(req, res, next) {
  if (process.env.NODE_ENV != 'DEVELOPMENT') {
    if (!req.user) {
      return res.redirect('/login');
    }
  }

  next();
});

app.use('/', stdUIController('home'));
app.post('/checkLogin', userController.cookieCheck);
app.post('/registerUser', userController.registerUser);
app.post('/submithosts', matchController.submithosts);
app.post('/submitvisitors', matchController.submitvisitors);
app.post('/availability', matchController.availability);
app.get('/match', matchController.rumble);
app.get('/getAvailableData', matchController.getAvailableData);

app.post('/deleteVisitors', userController.deleteVisitors);

app.post('/headerOrder', matchController.getHeaderData);
app.post('/updateHeaderOrder', matchController.updateHeaderOrder);

app.get('/employers', employerController.getEmployers);
app.post('/employers', employerController.createEmployer);
//app.get('/employers', function(req, res) {
//  Employer.find({}, function(err, data) {
//   res.json(data); 
//  });
//  
//});
app.get('/visitors', matchController.getVisitorsByDate);
app.post('/checkemployers', employerController.checkMatch);
app.post('/employermatch', employerController.employerMatch);

app.post('/checkschools', schoolController.checkAlias);
app.post('/schoolmatch', schoolController.schoolMatch);
app.get('/schools', schoolController.getSchools);
app.post('/hosts', schoolController.middleWare, matchController.submithosts);
app.post('/visitors', schoolController.middleWare, matchController.submitvisitors);
app.get('/calendar', calendarController.getDates);
app.get('/schoolaliases', function(req, res, next){
  db.Alias.find({}, function(err, data){

  res.json(data);
  })
})

app.use('/hosts', schoolController.middleWare, require('./controllers/hostController'));
app.use('/visitors', schoolController.middleWare, crudController('visitors'));
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
