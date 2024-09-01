const jwt = require('jsonwebtoken');
const { verify } = jwt;

const authFreeMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.replace('Bearer ', '').trim();

    try {
      const data = verify(token, 'secret');
      const { id, role } = data;

      req.userId = id;
      req.role = role;
    } catch (error) {
      return res.sendStatus(401);
    }
  } else {
    req.userId = null;
    req.role = null;
  }

  return next();
};

module.exports = authFreeMiddleware;
