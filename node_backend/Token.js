
let jwt = require('jsonwebtoken');
let config = require('./config');
function sendToken(results, callback, userId) {
    console.log(userId);
    let token = jwt.sign({ userId: userId },
        config.secret
        // {
        //     expiresIn: '24h' // expires in 24 hours
        // }
    );
    // return the JWT token for the future API calls
    callback({
        success: true,
        message: 'Authentication successful!',
        token: token,
        result: results

    });
}
module.exports = {
    sendToken: sendToken
};


