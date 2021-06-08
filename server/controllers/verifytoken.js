const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(404).json({ message: "No Token" });
  }
  jwt.verify(token, "Trawell", (err, decoded) => {
    if (err) {
      return res.status(404).json({ message: "Unauthorized" });
    }
    req.userId = decoded.id;
    req.email = decoded.email;
    next();
  });
};

module.exports.verifyToken_filter = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    req.email = "none";
    console.log(req.email);
    next();
  } 
  else{
    jwt.verify(token, "Trawell", (err, decoded) => {
      if (err) {
        return res.status(404).json({ message: "Unauthorized" });
      }
      req.userId = decoded.id;
      req.email = decoded.email;
      next();
    });
  }
};
