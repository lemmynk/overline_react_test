const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
// const csrf       = require('csurf')
// const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const {
  // version: libVersion,
  routes: libRoutes,
  middleware: libMiddleware,
  errors: libErrors,
} = require('@newtash/node-api-core');
const appDebugRoutes = require('./routes/debug');

const app = express();

// Default options
app.use(logger('dev'));
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
const adminUrl = process.env.ADMIN_URL;
const authUrl = process.env.AUTH_URL;
const pkceUrl = process.env.PKCE_URL;

// Attach url(s) to request
app.use((req, res, next) => {
  req.urls = {
    apiUrl,
    adminUrl,
    authUrl,
    pkceUrl,
  };
  next();
});

// CORS
app.use(cors());

app.use('/', require('./routes/index'));

// Image route (not protected)
app.use('/images', libRoutes.images);

// Debug routes
app.use('/debug', appDebugRoutes);
app.use('/i18n', libRoutes.i18nAdmin);

app.use(authUrl, libRoutes.user);
app.use(pkceUrl, libRoutes.pkce);

app.use(apiUrl, libMiddleware.pkce);
app.use(apiUrl, require('./routes/api'));

app.use(`${adminUrl}/files`, libRoutes.filesGet);
// app.use(adminUrl, libMiddleware.user);
app.use(`${adminUrl}/asset-categories`, libRoutes.assetCategories);
app.use(`${adminUrl}/assets`, libRoutes.assets);
app.use(`${adminUrl}/files`, libRoutes.filesStore);

app.use(adminUrl, require('./routes/admin/mpArt'));
app.use(adminUrl, require('./routes/admin/mpKom'));
// ///////////////////////////////////////
// /  END OF ROUTING
// ///////////////////////////////////////

// ///////////////////////////////////////
// / CSRF
// / Only the rutes defined after will be
// / csrf protected (?!)
// ///////////////////////////////////////
// app.use(cookieParser())
// app.use(csrf({ cookie: true }))

app.use(authUrl, libRoutes.login);

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

app.use(libErrors.apiErrorHandler);

module.exports = app;
