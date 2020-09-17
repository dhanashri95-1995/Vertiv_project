var jwt = require('jsonwebtoken');
module.exports = {
    verifyToken: function (req, res, next) {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // Get token from array
            const bearerToken = bearer[1];
            // Set the token
            return req.token = bearerToken;
            // Next middleware
            // next();
        } else {
           return '403';
        }
    },
    jwtVrify: function (token,res,req, next) {
        jwt.verify(token, 'this is mine',{ algorithm: 'RS256'}, (err, authData) => {
            if(err && err.name == "TokenExpiredError") {
                req.token_status = 'TokenExpired';
                // res.sendfile("./public/index.html");
                // res.redirect('/logout'); 
            }else if(err && err.message == "invalid token"){
                req.token_status = 'InvalidToken';
            } else {
                  authData;
                  req.token_status = 'Verify';
                //  next();
            }
            next();
          });
    },
}