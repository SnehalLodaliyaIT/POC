var PaytmChecksum = require("./PaytmChecksum");
var constants = require('./constants');

var paytmParams = {};
let merchantKey = constants.mkey;


async function generate(body) {
    paytmParams = body;
    console.log(paytmParams);
    var paytmChecksum = PaytmChecksum.generateSignature(paytmParams, merchantKey);
    let data = paytmChecksum.then(async function (result) {
        console.log(result);
        let verifyChecksum = await PaytmChecksum.verifySignature(paytmParams, merchantKey, result);
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


module.exports = generate;
