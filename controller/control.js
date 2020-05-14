const route = require('../routes/index');
const User = require('../model/User')
const Profile = require('../model/Profile')
const Joi = require('@hapi/joi');
const { RegValidation, LogValidation } = require('../Validation')
const bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');


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
    creatProf: (req, res) => {
        const profile = new Profile(req.body)
        res.send(profile)
            // post.save().then((posts) => {
            //     console.log(post);
            //     res.send(post)
            // }).catch((error) => {
            //     console.log(error)
            // })
    },
    LogForm: async(req, res) => {
        try {
            // //Validate Form
            const { error } = LogValidation(req.body);
            if (error) {
                return res.render('login', {
                    msg: error.details[0].message,
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
            req.session.userId = user._id
            res.redirect('/users/create')
        } catch (error) {
            console.log(error)
        }
    },
    CreatePage: (req, res) => {
        // console.log(req.session);
        res.render('create')
    },
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/');
        })
    }
}