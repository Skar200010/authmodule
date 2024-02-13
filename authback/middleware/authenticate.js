const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    console.log(token);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const tokenData = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
    const userId = tokenData.id;

    const user = await User.findById(userId);

    if (!user || user.token !== token || user.status !== true) {
      return res.status(401).json({ error: 'Unauthorized: Token is inactive or invalid' });
    }

    req.userId = userId;
    next();
  } catch (error) {
    console.error('Error in authenticateToken:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Token has expired' });
    }
    return res.status(403).json({ error: 'Forbidden: Invalid token' });
  }
};

module.exports = {
  authenticateToken,
};
