var mongoose = require('mongoose');

var userSchema = {
    marketPlaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marketplace'
    },
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