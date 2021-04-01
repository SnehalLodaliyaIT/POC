
    var axios = require('axios');
    let qs = require('qs');
    var data = {};

async function createCustomer(stripeObject){
    try {
        data = qs.stringify(stripeObject)
        var config = {
            method: 'get',
            url: 'https://api.stripe.com/v1/customers',
            headers: {
                'Authorization': 'Bearer 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'
            },
            data: data
        };
        if(Object.keys(stripeObject).length){
            config.headers[Content-Type]='application/x-www-form-urlencoded';
        }
       let result= await axios(config)
       return result.data;
    } catch (error) {
        throw error;
    }
}


    module.exports = {
        createCustomer
    }

