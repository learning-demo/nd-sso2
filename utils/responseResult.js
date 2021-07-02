module.exports = function (req, res, next) {
  res.sendResult = function (data, code, message, statusCode) {
    var fmt = req.query.fmt ? req.query.fmt : 'rest';
    if (fmt == 'rest') {

      code = code ? code : 200
      statusCode = statusCode ? statusCode : code
      res.status(statusCode).json({
        status: code,
        msg: message,
        data: data,
      });

    }
  };
  next();
};
