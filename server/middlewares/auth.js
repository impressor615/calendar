const CONFIG = require('config');

const { sendError } = require('../utils/routeUtils');
const errors = require('../errors');

const { token } = CONFIG;
module.exports = (req, res, next) => {
  const { language, headers, query } = req;
  const clientToken = headers['x-access-token'] || query.token;
  if (!clientToken || clientToken !== token) {
    sendError({
      res,
      language,
      error: errors.not_authenticated,
    });
    return;
  }

  next();
};
