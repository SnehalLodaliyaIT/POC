var mongoose = require('mongoose');

var apiSchema = {
    marketPlaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marketplace'
    },
    methodRoute: { type: String },
    methodType: { type: String },
    url: { type: String },
    parameters: { type: Array },
    response: { type: Array },
    description: { type: String }

};
module.exports = mongoose.model('Apis', apiSchema);