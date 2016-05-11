var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require("http");
var routes = require('./routes/index');
var homeRoute = require('./routes/home');
var detailsRoute = require('./routes/details');
var app = express();
var session = require("express-session");
var mongoStore = require("connect-mongo")(session);
var cfenv = require('cfenv');
var recordingRoute = require("./routes/recordings");
var MongoDB = require("./javascripts/commons/mongodbhandler");
var Auth = require("./routes/authentication");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("port",3000);


app.use(session({
	secret: '$@n-j05e-5+@+e-un!ver5!+y',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: MongoDB.MONGODB_URL
	})
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use("/recordings", recordingRoute);
app.use("/home", homeRoute);
app.use("/details", detailsRoute);
app.use("/auth", Auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
	  console.log(err);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}



// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
	console.log(err);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

MongoDB.connect(MongoDB.MONGODB_URL, function () {
	console.log("Connected to : " + MongoDB.MONGODB_URL);
});

http.createServer(app).listen(cfenv.getAppEnv().port, function() {
  console.log("Server started on port : " , cfenv.getAppEnv().port);
});

module.exports = app;