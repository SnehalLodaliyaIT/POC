var mongoose = require('mongoose');

var userSchema = {
    userName: {
        type: String
    },
    fullName: {
        type: String
    },
    emailId: {
        type: String
    }
};
module.exports = mongoose.model('User', userSchema);