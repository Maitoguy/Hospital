const jwt = require('jsonwebtoken');

const jwtAuth = (req , res, next) => {
    // Read the token
    const token = req.headers["authorization"];

    // If no token return the error
    if(!token){
        return res.status(401).send("Unauthorized Access");
    }

    // Check if token is valid
    try{
        const payload = jwt.verify(token , "Premachi Goshta");
    }catch(error){
        return res.status(401).send("Unauthorized Access");
    }
    next();
}

module.exports = jwtAuth;

