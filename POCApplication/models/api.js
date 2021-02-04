var mongoose = require('mongoose');

var apiSchema = {
    marketPlaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'marketPlace'
    },
    MethodType: { type: String },
    Url: { type: String },
    parameters: { type: Array },
    respone: { type: Array },
    Description: { type: String }

};
module.exports = mongoose.model('Apis', apiSchema);