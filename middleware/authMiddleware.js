const jwt = require("jsonwebtoken");

const roleBasedAccessControl = (roles) => {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).send("Access denied.");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).send("Invalid token.");
      if (!roles.includes(decoded.role))
        return res.status(403).send("Access denied.");
      req.user = decoded;
      next();
    });
  };
};

module.exports = roleBasedAccessControl;
