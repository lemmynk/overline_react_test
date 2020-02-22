const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const middleware = require('./routes/middleware');
const { apiErrorHandler } = require('./errors');
const { env } = require('./utils');

const app = express();

// Default options
app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ///////////////////////////////////////
// /  ROUTING
// ///////////////////////////////////////
const apiUrl = process.env.API_URL;
const authUrl = process.env.AUTH_URL;

// Attach url(s) to request
app.use((req, res, next) => {
  req.urls = {
    apiUrl,
    authUrl,
  };
  next();
});

// CORS
app.use(cors());

app.use('/', require('./routes/index'));
app.use(`${apiUrl}/debug`, require('./routes/api/debug'));

// API ROUTES
app.use(apiUrl, middleware.user);
app.use(`${apiUrl}/users`, require('./routes/api/users'));
app.use(`${apiUrl}/app-config`, require('./routes/api/appConfig'));
app.use(`${apiUrl}/art-pdv`, require('./routes/api/artPdv'));
app.use(`${apiUrl}/art-grupa`, require('./routes/api/artGrupa'));
app.use(`${apiUrl}/art-main`, require('./routes/api/artMain'));
app.use(`${apiUrl}/kom-mesto`, require('./routes/api/komMesto'));
app.use(`${apiUrl}/kom-main`, require('./routes/api/komMain'));

// AUTH ROUTES
app.use(authUrl, require('./routes/auth/index'));

if (!env.isProduction()) {
  // eslint-disable-next-line global-require
  app.use(`${authUrl}/debug`, require('./routes/auth/debug'));
}
// ///////////////////////////////////////
// /  END OF ROUTING
// ///////////////////////////////////////

// app.use(authUrl, libRoutes.login);

// app.get('/form', function (req, res) {
//   // pass the csrfToken to the view
//   res.render('auth', { csrfToken: req.csrfToken() })
// })

// app.post('/process', function (req, res) {
//   res.send('csrf was required to get here')
// })

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ///////////////////////////////////////
// ERROR HANDLING
// ///////////////////////////////////////
// ERROR LOGGER
const errorLogger = (err, req, res, next) => {
  if (process.env.ENVIRONMENT !== 'production') {
    // eslint-disable-next-line
    console.error('logErrors:', err.message);
  }
  next(err);
};
app.use(errorLogger);

app.use(apiErrorHandler);

module.exports = app;
