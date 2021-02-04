var mongoose = require('mongoose');

var userSchema = {
    marketPlaceId: {
        type: Schema.Types.ObjectId,
        ref: 'Marketplace'
    },
    username: {
        type: String
    },
};
module.exports = mongoose.model('User', userSchema);