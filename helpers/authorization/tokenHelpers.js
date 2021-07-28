const sendJwtToClient = (user, res) => {
  const token = user.generateJwtFromUser();
  const { JWT_COOKIE } = require("../../config/env/keys");
  return res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000),
      secure: false,
    })
    .json({
      success: true,
      access_token: token,
      data: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
};

const getAccessTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;

  const accessToken = authorization.split(" ")[1];
  return accessToken;
};

const isTokenIncluded = (req) => {
  return (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
  );
};

module.exports = { sendJwtToClient, isTokenIncluded, getAccessTokenFromHeader };
