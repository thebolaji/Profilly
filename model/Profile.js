var mongoose = require('mongoose');

var Schema = mongoose.Schema;

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
    date: {
        type: Date,
        default: Date.now
    }
});


var Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;