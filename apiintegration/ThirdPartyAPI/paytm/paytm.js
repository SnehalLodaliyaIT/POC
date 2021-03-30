
const axios = require('axios');
var PaytmChecksum = require("./PaytmChecksum");
let constants=require('../../constant');
var data = {};

var paytmParams = {};
async function generateCheckSum(body) {
    paytmParams = body;
    
    var paytmChecksum = PaytmChecksum.generateSignature(paytmParams, process.env.PAYTM_MERCHANT_KEY);
    let data = paytmChecksum.then(async function (result) {
        let verifyChecksum = await PaytmChecksum.verifySignature(paytmParams, process.env.PAYTM_MERCHANT_KEY, result);
        if (verifyChecksum) {
            return result
        }
        else {
            return null;
        }

    }).catch(function (error) {
        console.log(error);
    });
    return data;
}

async function initiateTransaction(paytmObject){
    try {
        paytmObject.body.mid = process.env.PAYTM_MERCHANT_ID;
        paytmObject.body.websiteName = constants.PAYTM.WEBSITE;
        let signature = await generateCheckSum(JSON.stringify(paytmObject.body));
        Object.assign(paytmObject, {
            head: {
                "signature": signature
            }
        })
        data = JSON.stringify(paytmObject)
        
        var config = {
            method: 'post',
            url: `${constants.PAYTM.PAYTM_BASEURL}/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MERCHANT_ID}&orderId=${paytmObject.body.orderId}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        let result =axios(config)
        .then(function (response) {
            console.log(response.data)
            return(response.data);
        })
        .catch(function (error) {
           return(error);
        });
        return result;
    } catch (error) {
        return error;
    }
}


async function createCustomer(paytmObject){
    try {
        paytmObject.body.mid = process.env.PAYTM_MERCHANT_ID;
        paytmObject.body.websiteName = constants.PAYTM.WEBSITE;
        let signature = await generateCheckSum(JSON.stringify(paytmObject.body));
        Object.assign(paytmObject, {
            head: {
                "signature": signature
            }
        })
        data = JSON.stringify(paytmObject)
        
        var config = {
            method: 'get',
            url: `${constants.PAYTM.PAYTM_BASEURL}/v1/customers`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        let result =axios(config)
        .then(function (response) {
            console.log(response.data)
            return(response.data);
        })
        .catch(function (error) {
           return(error);
        });
        return result;
    } catch (error) {
        return error;
    }
}



module.exports = {
	createCustomer,
    generateCheckSum,
    initiateTransaction
}

