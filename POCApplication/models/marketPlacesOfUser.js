var mongoose = require('mongoose');

var marketPlacesOfUserSchema = {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    marketPlaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'marketPlace'
    },
    secretKey: {
        type: String
    },
    isAuthorized: {
        type: Boolean
    }
};
module.exports = mongoose.model('MarketPlacesOfUser', marketPlacesOfUserSchema);