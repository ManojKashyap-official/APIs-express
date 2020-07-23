const jwt = require('jsonwebtoken');




module.exports = function(req, res, next) {
    const token = req.header('x-header-token');
    if (!token) return res.status(401).send('Access Denied: no token provide');



    try {
        const decoded = jwt.verify(token, 'privateKey')
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send(' Ivalid Token ');
    }
}