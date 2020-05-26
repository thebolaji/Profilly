var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var slugify = require("slugify");

var profileSchema = new Schema({
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  othername: {
    type: String,
  },
  occupation: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  about: {
    type: String,
  },
  facebook: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  twitter: {
    type: String,
  },
  other: {
    type: String,
  },
  image: {
    type: String,
  },
  resume: {
    type: String,
  },
  slug: {
    type: String,
    require: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
profileSchema.pre("validate", function (next) {
  if (this.lastname) {
    this.slug = slugify(this.lastname, { lower: true, strict: false });
  }
  next();
});
var Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
