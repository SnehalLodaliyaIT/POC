const axios = require('axios');
const generate = require('./ChecksumGeneration');
let data = {"body":{"requestType":"Payment","mid":"NUigXp26888780822392","websiteName":"WEBSTAGING","orderId":"725.1171490692083","txnAmount":{"value":"1.00","currency":"INR"},"userInfo":{"custId":"CUST_001"},"callbackUrl":"https://merchant.com/callback"}};
Object.assign(data, {
    head: {
        "signature": await generate(JSON.stringify(data.body))
    }
})
data = JSON.stringify(data);

var config = {
    method: 'POST',
    url: 'https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=NUigXp26888780822392&orderId=725.1171490692083',
    headers: {
        
            'Content-Type': 'application/json',
        
         
    },
     data : data
}

axios(config)
.then(function (response) {
res.send(JSON.stringify(response.data))
})
.catch(function (error) {
res.send(JSON.stringify(error))
});

var PaytmChecksum = require("./PaytmChecksum");
var constants = require('../../constant');

var paytmParams = {};
async function generateCheckSum(body) {
    paytmParams = body;
    paytmParams.mid=env.process.PAYTM_MERCHANT_ID;
    paytmParams.websiteName=constants.PAYTM.WEBSITE

    var paytmChecksum = PaytmChecksum.generateSignature(paytmParams, process.env.PAYTM_MERCHANT_KEY);
    let data = paytmChecksum.then(async function (result) {
        console.log(result);
        let verifyChecksum = await PaytmChecksum.verifySignature(paytmParams, process.env.PAYTM_MERCHANT_KEY, result);
        console.log(verifyChecksum);
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
module.exports ={
    generateCheckSum
} 