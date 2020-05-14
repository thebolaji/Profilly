module.exports = (req, res, next) => {
    //find user from  session
    if (req.session.userId) {
        return res.redirect('/users/create')
    }
    next()
}