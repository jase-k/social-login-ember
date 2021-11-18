const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.headers.api_key, process.env.SECRET_KEY, (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false});
    } else {
      next();
    }
  });
}

