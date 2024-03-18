const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

  if (token == null) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      // Check for token expiration specific error
      if (err.name === 'TokenExpiredError') {
        return res.status(409).json({ message: "Token expired" });
      } else {
        return res.status(403).json({ message: "Token is not valid" });
      }
    }

    // If the token is verified successfully, attach the user info to the request object
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
