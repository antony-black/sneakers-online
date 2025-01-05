const ApiError = require('../exceptions/api-error');
const tokenService = require('../services/token-service');

module.exports = function(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader) {
      return next(ApiError.UnautorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnautorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnautorizedError());
    }

    req.user = userData;
    next();
  } catch(err) {
    return next(ApiError.UnautorizedError());
  }
}