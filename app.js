const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

const configurePassport = require('./helpers/passport');

const auth = require('./routes/auth');
const users = require('./routes/users');
const ico = require('./routes/ico');

const app = express();

// database config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cryptico', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// session config
app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// passpport config
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', auth);
app.use('/users', users);
app.use('/ico', ico);

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404);
  res.json({ error: 'not found' });
});

// error handler
app.use(function(err, req, res, next) {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only send response if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.json({ error: 'unexpected' });
  };
});

module.exports = app;
