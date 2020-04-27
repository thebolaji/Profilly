// const route = require('../routes/index');
const User = require('../model/User')
const Joi = require('@hapi/joi');
const { RegValidation } = require('../Validation')

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
    },

    RegForm: async(req, res) => {
        const { error } = RegValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        try {
            const saveUser = await user.save()
            console.log(saveUser);
        } catch (error) {
            console.log(error);
        }
    }
}