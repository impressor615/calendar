const errors = require('../errors');

module.exports = {
  sendError: (res, error = errors.route_invalid_data, status = 500) => (
    res.status(status).json({
      type: 'error',
      message: error.message,
      error,
    })
  ),
};
