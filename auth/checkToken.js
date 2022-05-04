const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    var sessData = req.session;

    // Lay token tu session 
    let token = sessData.auth_token;
    console.log('Token: ' + token);
    // if (!token) return res.status(401).send('You do not have permission 4 this action');

    try {
        // if (!token) {
        //     req.user = undefined;
        //     next();
        // } else {
        //     const checkToken = jwt.verify(token, 'masobimat01');
        //     req.user = checkToken;
        //     next();
        // }
        
        // If else token ton` tai hay khong`
        req.user = (!token) ? undefined : jwt.verify(token, 'masobimat01');
        next();

    } catch (error) {
        res.status(400).send(error)
    }
}