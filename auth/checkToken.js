const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    var sessData = req.session;
    let token = sessData.auth_token;
    console.log('Token: ' + token);
    if (!token) return res.status(401).send('You do not have permission 4 this action');
    try {
        const checkToken = jwt.verify(token, 'masobimat01');
        req.user = checkToken;
        next();
    } catch (error) {
        res.status(400).send(error)
    }
}