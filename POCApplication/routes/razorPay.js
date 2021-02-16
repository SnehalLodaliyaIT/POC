var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var exec = require('child_process').exec;

router.use(bodyParser.json());

router.get('/getRazorPayCurl', async function (req, res, next) {
    var args = "  -X POST https://api.razorpay.com/v1/orders  -u 'sk_test_51IGOMfBuOumXPWbaDEIJsTcnOJY2QdFc1CPiqLLjLmypWdoRzIFrCvPBduVUXeOhTELNxyM2V36s0xkdlh4v2t9E005eCsYGcr :'";

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
