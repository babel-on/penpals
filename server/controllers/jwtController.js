const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_KEY;
const jwtController = {};

jwtController.write = (req, res, next) => {
  const { _id, username, language } = res.locals.user;
  res.cookie(
    'jwt',
    jwt.sign(
      {
        userId: _id,
        username: username,
        language: language,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )
  );
  next();
};

jwtController.verify = (req, res, next) => {
  if (!req.cookies.jwt) {
    return next({
      log: null,
      status: 401,
      message: 'You are not logged in',
    });
  }
  try {
    res.locals.user = jwt.verify(req.cookies.jwt, JWT_SECRET);
    next();
  } catch (err) {
    next({
      log: null,
      status: 401,
      message: 'Invalid JWT',
    });
  }
};

module.exports = jwtController;
