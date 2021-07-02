module.exports = function (req, res, next) {
  res.sendResult = function (data, code, message) {
    var fmt = req.query.fmt ? req.query.fmt : 'rest';
    if (fmt == 'rest') {
      res.json({
        status: code,
        msg: message,
        data: data,
      });
    }
  };
  next();
};
