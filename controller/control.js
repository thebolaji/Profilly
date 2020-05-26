const route = require("../routes/index");
const User = require("../model/User");
const Profile = require("../model/Profile");
const Joi = require("@hapi/joi");
const { RegValidation, LogValidation } = require("../Validation");
const bcrypt = require("bcryptjs");
// var jwt = require('jsonwebtoken');

module.exports = {
  HomePage: (req, res) => {
    res.render("home", { title: "Profilly" });
  },
  RegPage: (req, res) => {
    res.render("register", {
      style: "register.css",
      title: "Register",
    });
  },
  LoginPage: (req, res) => {
    res.render("login", { style: "login.css", title: "Login" });
  },

  RegForm: async (req, res) => {
    // validation
    const { error } = RegValidation(req.body);
    if (error) {
      return res.render("register", {
        msg: error.details[0].message,
        style: "register.css",
        title: "Register",
        name: req.body.name,
        email: req.body.email,
      });
    }
    //Check if email is in db
    const existEmail = await User.findOne({ email: req.body.email });
    if (existEmail) {
      return res.render("register", {
        msg: '"email" is in our database',
        style: "register.css",
        title: "Register",
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
      password: hashPass,
    });
    try {
      const saveUser = await user.save();
      res.redirect("login");
    } catch (error) {
      console.log(error);
    }
  },
  creatProf: async (req, res) => {
    let profile = new Profile({
      name: req.body.name,
      lastname: req.body.lastname,
      othername: req.body.othername,
      occupation: req.body.occupation,
      email: req.body.email,
      phone: req.body.phone,
      about: req.body.about,
      facebook: req.body.facebook,
      linkedin: req.body.linkedin,
      twitter: req.body.twitter,
      other: req.body.other,
    });
    try {
      profile = await profile.save();
      console.log(profile.id);
      res.redirect(`/users/${profile.slug}`);
    } catch (error) {
      console.log(error);
      res.redirect(`/users/create`);
    }
  },
  LogForm: async (req, res) => {
    try {
      // //Validate Form
      const { error } = LogValidation(req.body);
      if (error) {
        return res.render("login", {
          msg: error.details[0].message,
          style: "login.css",
          title: "Login",
        });
      }

      //Check form in DataBase
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.render("login", {
          msg: "No Email on our Database",
          style: "login.css",
          title: "Login",
        });

      // Check if password === true
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) return res.render("login", { msg: "Invalid password" });
      req.session.userId = user._id;
      res.redirect("/users/create");
    } catch (error) {
      console.log(error);
    }
  },
  CreatePage: (req, res) => {
    res.render("create");
  },
  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  },
  update: (res, req) => {
    const profile = Profile.findOneAndUpdate(
      { id: req.body._id },
      {
        name: req.body.name,
        lastname: req.body.lastname,
        othername: req.body.othername,
        occupation: req.body.occupation,
        email: req.body.email,
        phone: req.body.phone,
        about: req.body.about,
        facebook: req.body.facebook,
        linkedin: req.body.linkedin,
        twitter: req.body.twitter,
        other: req.body.other,
        profileId: req.body._id,
      },
      { new: true },
      (err, data) => {
        if (err) {
          return console.log("BAD");
        }
        console.log("Good");
      }
    );
  },
  Preview: async (req, res) => {
    const profile = await Profile.findOne({ slug: req.params.slug });
    // console.log("profile:", profile);
    if (profile == null) res.redirect("/");
    profiles = {
      name: profile.name,
      lastname: profile.lastname,
      othername: profile.othername,
      occupation: profile.occupation,
      email: profile.email,
      phone: profile.phone,
      about: profile.about,
      facebook: profile.facebook,
      linkedin: profile.linkedin,
      twitter: profile.twitter,
      other: profile.other,
      id: profile._id,
    };
    // console.log("profiles: ", profiles);
    try {
      res.render("create2", { profiles });
    } catch (error) {
      console.log("error: ", error);
    }
  },
  deletePage: async (req, res) => {
    await Profile.findByIdAndDelete(req.params.id);
    res.redirect("/users/create");
  },
  editPage: async (req, res) => {
    let profile = await Profile.findById(req.params.id);
    profiles = {
      name: profile.name,
      lastname: profile.lastname,
      othername: profile.othername,
      occupation: profile.occupation,
      email: profile.email,
      phone: profile.phone,
      about: profile.about,
      facebook: profile.facebook,
      linkedin: profile.linkedin,
      twitter: profile.twitter,
      other: profile.other,
      id: profile._id,
    };
    // console.log("profiles: ", profiles);
    try {
      res.render("edit", { profiles });
    } catch (error) {
      console.log("error: ", error);
    }
  },
  updatePage: async (req, res) => {
    let profiles = await Profile.findById(req.params.id);
    let profile = req.profiles;
    profile.name = req.body.name;
    profile.lastname = req.body.lastname;
    profile.othername = req.body.othername;
    profile.occupation = req.body.occupation;
    profile.email = req.body.email;
    profile.phone = req.body.phone;
    profile.about = req.body.about;
    profile.facebook = req.body.facebook;
    profile.linkedin = req.body.linkedin;
    profile.twitter = req.body.twitter;
    profile.other = req.body.other;
    try {
      profile = await profile.save();
      console.log(profile.id);
      res.redirect(`/users/${profile.slug}`);
    } catch (error) {
      res.redirect(`/users/edit`);
    }
  },
};
