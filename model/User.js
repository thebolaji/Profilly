var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        // required: true,

    },
    email: {
        type: String,
        // required: true,
        // trim: true,
    },
    password: {
        type: String,
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

var User = mongoose.model('User', UserSchema);
module.exports = User;