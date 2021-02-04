var mongoose = require('mongoose');

var marketPlaceSchema = {
    marketPlaceName: { type: String },
    logo: { type: String },
    description: { type: String },
    isAuthenticationRequired: { type: Boolean },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Master'
    },
    isAuthenticationTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Master'
    }
};
module.exports = mongoose.model('Marketplace', marketPlaceSchema);