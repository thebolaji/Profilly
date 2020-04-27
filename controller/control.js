const route = require('../routes/index');
const User = require('../model/User')
module.exports = {
    HomePage: (req, res) => {
        res.render('home', { title: 'Profilly' });
    },
    RegPage: (req, res) => {

        res.render('register', {
            style: 'register.css',
            title: 'Register'
        });
    },
    LoginPage: (req, res) => {
        res.render('login', { style: 'login.css', title: 'Login' });
    }
}