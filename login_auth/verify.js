const User = require('../model/User')
module.exports = (req, res, next) => {
    //find user from  session
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) return res.redirect('/users/login')
        next()
    })
}