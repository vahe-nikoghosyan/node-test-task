const jwt = require("jsonwebtoken");
const verify = function(req, res, next){
    const token = req.header('Authorization');

    if(!token) return res.status(401).send('Access denid');

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET || '123456');
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token!');
    }
}

module.exports = verify;
