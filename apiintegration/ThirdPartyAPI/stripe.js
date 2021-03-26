
var axios = require('axios');
let qs = require('qs');
let stripeDetails=require('../constant');
var data = {};

async function getAllCustomer(stripeObject){
    try {
        data = qs.stringify(stripeObject)
        var config = {
            method: 'get',
            url: `${stripeDetails.STRIPE.STRIPE_BASEURL}/v1/customers`,
            headers: {
                'Authorization': `${stripeDetails.STRIPE.STRIPE_TOKEN_TYPE} ${process.env.STRIPE_SECRET_KEY}`
            },
            data: data
        };
        if(Object.keys(stripeObject).length){
            config.headers[Content-Type]='application/x-www-form-urlencoded';
        }
       let result= await axios(config)
       return result.data;
    } catch (error) {
        return error;
    }
}


async function createCustomer(stripeObject){
    try {
        data = qs.stringify(stripeObject)
        var config = {
            method: 'get',
            url: `${stripeDetails.STRIPE.STRIPE_BASEURL}/v1/customers`,
            headers: {
                'Authorization': `${stripeDetails.STRIPE.STRIPE_TOKEN_TYPE} ${process.env.STRIPE_SECRET_KEY}`
            },
            data: data
        };
        if(Object.keys(stripeObject).length){
            config.headers[Content-Type]='application/x-www-form-urlencoded';
        }
       let result= await axios(config)
       return result.data;
    } catch (error) {
        return error;
    }
}


module.exports = {
	createCustomer,
    getAllCustomer
}

