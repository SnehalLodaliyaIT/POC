var mongoose = require('mongoose');

var userSchema = {
    marketPlaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marketplace'
    },
    username: {
        type: String
    },
};
module.exports = mongoose.model('User', userSchema);