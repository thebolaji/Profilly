const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Uses = require('../model/User');
const dotenv = require('dotenv').config()


module.exports = {
    checkToken: (req, res, next) => {
        const header = req.headers['authorization'];
        console.log('Header', header);

        if (typeof header !== 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];
            req.token = token;
            console.log('token', token);
            jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
                if (err) {
                    //If error send Forbidden (403)
                    console.log('ERROR: Could not connect to the protected route');
                    res.sendStatus(403);
                }
            })
            next();
        }
    }
}