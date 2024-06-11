const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //getting token string from auth. header
    const payload = jwt.verify(token, process.env.TOKEN_SECRET); //verify token - if valid it returns payload
    req.payload = payload; //add payload to req. object to use in route or midware
    console.log("Payload:", payload);
    next(); //passing req. to next middleware
  } catch (error) {
    res.status(401).json("token not provided or not valid");
  }
};
// exporting midware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
};
