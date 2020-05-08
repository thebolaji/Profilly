// const route = require('../routes/index');
const User = require('../model/User')
const Joi = require('@hapi/joi');
const { RegValidation, LogValidation } = require('../Validation')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');




module.exports = {
    HomePage: (req, res) => {
        res.render('home', { title: 'Profilly' });
    },
    RegPage: (req, res) => {
        var token = req.headers.auth - token;
        if (token) return res.redirect('/create');
        res.render('register', {
            style: 'register.css',
            title: 'Register'
        });
    },
    LoginPage: (req, res) => {
        res.render('login', { style: 'login.css', title: 'Login' });
    },

    RegForm: async(req, res) => {
        // validation
        const { error } = RegValidation(req.body);
        if (error) {
            return res.render('register', {
                msg: error.details[0].message,
                style: 'register.css',
                title: 'Register',
                name: req.body.name,
                email: req.body.email,
            });
        }
        //Check if email is in db
        const existEmail = await User.findOne({ email: req.body.email });
        if (existEmail) {
            return res.render('register', {
                msg: '"email" is in our database',
                style: 'register.css',
                title: 'Register',
                name: req.body.name,
                email: req.body.email,
            });
        }
        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPass
        })
        try {
            const saveUser = await user.save()
            res.redirect('login')
        } catch (error) {
            console.log(error);
        }
    },

    LogForm: async(req, res) => {
        // //Validate Form
        const { error } = LogValidation(req.body);
        if (error) {
            return res.render('login', {
                msg: error.detail[0].message,
                style: 'login.css',
                title: 'Login'
            })
        }

        //Check form in DataBase
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.render('login', {
            msg: 'No Email on our Database',
            style: 'login.css',
            title: 'Login',
        });

        // Check if password === true
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) return res.render('login', { msg: 'Invalid password' })


        //Ceate tokken
        const token = jwt.sign({ _id: user._id }, process.env.DB_TOKEN, {
            expiresIn: 86400 // expires in 24 hours
        });
        // res.header('auth-token', token)
        res.render('create');
        console.log(token);

    },
    CreatePage: (req, res) => {
        res.render('create')
    }
}