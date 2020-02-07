const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { apiErrorHandler } = require('./errors');

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
// const apiUrl = process.env.API_URL;
// const adminUrl = process.env.ADMIN_URL;
const authUrl = process.env.AUTH_URL;
// const pkceUrl = process.env.PKCE_URL;

// Attach url(s) to request
app.use((req, res, next) => {
  req.urls = {
    // apiUrl,
    // adminUrl,
    authUrl,
    // pkceUrl,
  };
  next();
});

// CORS
app.use(cors());

app.use(authUrl, require('./routes/auth/index'));
app.use(`${authUrl}/debug`, require('./routes/auth/debug'));

// NO CORS

app.use('/', require('./routes/index'));
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
