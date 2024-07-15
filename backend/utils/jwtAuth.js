const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');

const signJwt = (json) => {
    const token = jwt.sign(json, JWT_SECRET);
    return token;
}
const verifyJwt = (token) => {
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }
    catch(error){
        return null;
    }
}

module.exports = {
    signJwt,
    verifyJwt
}