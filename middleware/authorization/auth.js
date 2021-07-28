const jwt = require("jsonwebtoken");
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../../helpers/authorization/tokenHelpers");
const CustomError = require("../../helpers/errors/CustomError");

const getAccessToRoute = (req, res, next) => {
  const { JWT_SECRET_KEY } = require("../../config/env/keys");
  if (!isTokenIncluded(req)) {
    next(new CustomError("You are not authorized to access this route", 401));
  }
  const accessToken = getAccessTokenFromHeader(req);
  jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(
        new CustomError("You are not authorized to access this route", 401)
      );
    }

    req.user = {
      id: decoded.id,
      firstName: decoded.first_name,
    };

    next();
  });
};

module.exports = getAccessToRoute;
