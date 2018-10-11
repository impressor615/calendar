const errors = require('../errors');

module.exports = {
  sendError: ({
    res,
    language,
    error = errors.route_invalid_data,
    status = 400,
  }) => {
    const message = error[language] || error.en;
    return res.status(status).json({
      type: 'error',
      message,
    });
  },
};
