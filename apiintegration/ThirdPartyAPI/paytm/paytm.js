
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

        paytmObject.data.body.mid = process.env.PAYTM_MERCHANT_ID;
        paytmObject.data.body.websiteName = constants.PAYTM.WEBSITE;
        let signature = await generateCheckSum(JSON.stringify(paytmObject.data.body));
        Object.assign(paytmObject.data, {
            head: {
                "signature": signature
            }
        })

        data = JSON.stringify(paytmObject.data)
        
        var config = {
            method: 'post',
            url: `${constants.PAYTM.PAYTM_BASEURL}/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MERCHANT_ID}&orderId=${paytmObject.queryParams.orderId}`,
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
            throw(error);
        });
        return result;
    } catch (error) {
        throw error;
    }
}


async function initiateTransaction(paytmObject){
    try {

        paytmObject.data.body.mid = process.env.PAYTM_MERCHANT_ID;
        paytmObject.data.body.websiteName = constants.PAYTM.WEBSITE;
        let signature = await generateCheckSum(JSON.stringify(paytmObject.data.body));
        Object.assign(paytmObject.data, {
            head: {
                "signature": signature
            }
        })

        data = JSON.stringify(paytmObject.data)
        
        var config = {
            method: 'post',
            url: `${constants.PAYTM.PAYTM_BASEURL}/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MERCHANT_ID}&orderId=${paytmObject.queryParams.orderId}`,
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
            throw(error);
        });
        return result;
    } catch (error) {
        throw error;
    }
}


module.exports = {
	initiateTransaction,
    generateCheckSum,
    initiateTransaction
}

