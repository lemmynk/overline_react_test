const ValidationError = require('./ValidationError');

// eslint-disable-next-line
module.exports = (err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.message = err.message
  // res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500);
  if (err instanceof ValidationError) {
    res.json(err.message);
  } else if (process.env.ENVIRONMENT === 'production') {
    res.end();
  } else {
    res.json({ error: err.message });
  }
};
