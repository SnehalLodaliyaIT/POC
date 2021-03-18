var express = require('express');
const axios = require('axios')
const stripe = require('stripe')('sk_test_51IGOMfBuOumXPWbaDEIJsTcnOJY2QdFc1CPiqLLjLmypWdoRzIFrCvPBduVUXeOhTELNxyM2V36s0xkdlh4v2t9E005eCsYGcr');
var router = express.Router();
var exec = require('child_process').exec;

router.get('/getCustomerCheckCurl', async function (req, res, next) {
    var args = "  https://api.stripe.com/v1/customers  -u 'sk_test_51IGOMfBuOumXPWbaDEIJsTcnOJY2QdFc1CPiqLLjLmypWdoRzIFrCvPBduVUXeOhTELNxyM2V36s0xkdlh4v2t9E005eCsYGcr :'";

    const customer=exec('curl ' + args, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        res.send(stdout);
    });
    
});



module.exports = router;




//Example of curl for run in terminal
// curl https://api.stripe.com/v1/customers \
//   -u curl https://api.stripe.com/v1/customers \
//   -u sk_test_51IGOMfBuOumXPWbaDEIJsTcnOJY2QdFc1CPiqLLjLmypWdoRzIFrCvPBduVUXeOhTELNxyM2V36s0xkdlh4v2t9E005eCsYGcr: \
//   -d limit=3 \
//   -d limit=3 \
//   -G

//curl https://api.stripe.com/v1/charges \
  //-u sk_test_51IGOMfBuOumXPWbaDEIJsTcnOJY2QdFc1CPiqLLjLmypWdoRzIFrCvPBduVUXeOhTELNxyM2V36s0xkdlh4v2t9E005eCsYGcr: