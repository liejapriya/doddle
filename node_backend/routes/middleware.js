let jwt = require('jsonwebtoken');
const config = require('../config');


let checkToken = (req, res, next) => {
    console.log(req.body, "entey");
    console.log(req.headers.authorization);
    token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

    if (token.startsWith('Bearer')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
        console.log(token, "tokenn");
    }

    if (token) {
        console.log("hi");
        console.log(token, "tokenn");
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                console.log("hi1", err);

                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                console.log("hi2");

                req.decoded = decoded;
                console.log(decoded, "decoded");
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};
module.exports = {
    checkToken: checkToken
}


