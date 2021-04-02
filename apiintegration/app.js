var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const got = require("got");
const marketPlace = require('./model/marketPlace');
const master = require('./model/master');
const apis = require('./model/apis');
const _ = require('lodash');
let dotenv = require('dotenv');
const service = require("./utils/dbService");
dotenv = dotenv.config();
//const paytm=require('./ThirdPartyAPI/paytm/paytm')
//const stripe=require('./ThirdPartyAPI/stripe');


const ejs = require('ejs');
const util = require('util');
//const MODE_0755 = parseInt('0755', 8)
const MODE_0666 = parseInt('0666', 8);
//const TEMPLATE_DIR = path.join(__dirname, 'views')
var app = express();

const routes = require("./routes/index");
const { required } = require('joi');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var axios = require('axios');
const qs = require('qs');

app.get('/test-paytm', async (req, res) => {

    var data = {
        data: {
            body: {
                "requestType": "Payment",
                "orderId": "201222234",
                "txnAmount": { "value": "1.00", "currency": "INR" },
                "userInfo": { "custId": "CUST_001" },
                "callbackUrl": "https://merchant.com/callback"
            }
        },
        queryParams: {
            "orderId": "201222234"
        }
    }

    let result //=await paytm.initiateTransaction(data)
    res.send(result);
})


app.get("/", async (req, res) => {
    const appName = "DemoApp";
    let data = await marketPlace.findOne({ marketPlaceName: "RazorPay" });
    let authentication = _.map(data.authenticationTypeId, a => {
        return a;
    });
    authentication = await master.find({ _id: authentication });
    authentication = _.map(authentication, a => {
        return a.name;
    });
    console.log(authentication);
    let app = loadTemplate('authentication/js');
    app.locals.appName = appName;
    app.locals.authentication = authentication;
    //const params = req.params.secretkey;
    //app.locals.key = "FBvS9T2qXgPe3FNLg12FZ8aR";
    const dir = "/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/";
    write(path.join(dir, './authentication.json'), app.render());
    res.send("ok");
})

function loadTemplate(name) {
    console.log(__dirname);
    let contents = fs.readFileSync(path.join(__dirname, 'views', (name + '.ejs')), 'utf-8')
    let locals = Object.create(null)

    function render() {
        return ejs.render(contents, locals, {
            escape: util.inspect
        })
    }

    return {
        locals: locals,
        render: render
    }
}


async function createRoutes(dir) {
    let app = loadTemplate('routeTemplate.js');
    let data = new Array();
    let marketPlaceName = "github";
    let marketPlaceData = await Marketplace.findOne({ marketPlaceName: marketPlaceName });
    let apiData = await Apis.find({ marketPlaceId: marketPlaceData._id });
    apiData.forEach(element => {
        data.push(element);
    });
    app.locals.data = data;
    write(path.join(dir, './routes/test.js'), app.render());
}



//generateCode("/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/");
//generateCode("/home/snehallodaliya/Downloads/POC/POC/apiintegration");


app.get('/test-stripe', async (req, res) => {
    const stripeobj = {
        "body": {},
        "queryParams": {}
    }
    let data //=await stripe.getAllCustomer(stripeobj)
    res.send(data);
});

app.get('/test-mailgun', async (req, res) => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
    var axios = require('axios');
    var data = {};

    var config = {
        method: 'get',
        url: 'https://api.mailgun.net/v3/domains',
        headers: {
            'Authorization': 'Basic YXBpOjk2ZWQyNDI2ODFhZGVkMWY1MDE4ZGIyMTlkZjNjN2JlLTczZTU3ZmVmLTU3YmVhYWM3'
        },

    };

    axios(config)
        .then(function (response) {
            res.send(JSON.stringify(response.data))
        })
        .catch(function (error) {
            res.send(JSON.stringify(error))
        });


});

app.get('/test-razorpay', async (req, res) => {
    var axios = require('axios');
    var data = {};

    var config = {
        method: 'post',
        url: 'https://api.razorpay.com/v1/customers',
        headers: {
            'Authorization': 'Basic cnpwX3Rlc3RfZndaS3hBZHI0ZFQ3dkc6bVlyUmhLNVhEbVZ0OGNWaVVIc2l0Mnly'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            res.send(JSON.stringify(response.data))
        })
        .catch(function (error) {
            res.send(JSON.stringify(error))
        });
});

app.get('/test-twillo', async (req, res) => {
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();



    data.append('Body', 'hello test1');

    data.append('From', '+18509902046');



    var config = {
        method: 'get',
        url: 'https://api.twilio.com/2010-04-01/Accounts/AC8315088cafc60a9b164b591352bef4f1/Messages.json',
        headers: {
            'Authorization': 'Basic QUM4MzE1MDg4Y2FmYzYwYTliMTY0YjU5MTM1MmJlZjRmMToyNWMxMWJhNjY3MDA3NzllM2FhMTg2NTkxNjVjMWVmOA==',
            ...data.getHeaders()
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            res.send(JSON.stringify(response.data))
        })
        .catch(function (error) {
            res.send(JSON.stringify(error))
        });
})

async function validateParams(APIId, data) {
    let result = await service.getSingleDocumentById(apis, APIId);
    result = result.toJSON();
    result = result.parameters;
    let requiredParams = []
    for (let i = 0; i < result.length; i++) {
        let data = result[i].parameters;
        for (let j = 0; j < data.length; j++) {
            if (data[j].required) {
                requiredParams.push(data[j].name)
            }
            if (data[j].childParams != []) {
                for (let k = 0; k < data[j].childParams; k++) {
                    requiredParams.push(data[j].childParams.name)
                }
            }
        }
    }
    console.log(requiredParams)
    let params = { ...data.data.body, ...data.queryParams }
    for (let i = 0; i < requiredParams.length; i++) {
        for (const [key, value] of Object.entries(params)) {
            if (key == requiredParams[i]) {
                if (!value) {
                    return true;
                }
            }
        }
    }
    return false;
}

let paytmObject = {
    "data": {
        "body": {
            "requestType": "Payment",
            "mid": "NUigXp26888780822392",
            "orderId": "110001",
            "websiteName": "WEBSTAGING",
            "txnAmount": {
                "value": "1.00",
                "currency": "INR"
            },
            "userInfo": {
                "custId": "CUST_001"
            }
        },
    },
    "queryParams": {
        "mid": "NUigXp26888780822392",
        "orderId": "110001"
    }
}

app.get('/test-valid', async (req, res) => {
    let results = await validateParams("60656f92c2cdb1a6febbdbc4", paytmObject);
    console.log(results);
})


// async function test() {
//     let paytmService = require('./ThirdPartyAPI/paytm/paytm');
// let paytmObject = {
//     "data": {
//         "body": {
//             "requestType": "Payment",
//             "mid": "NUigXp26888780822392",
//             "orderId": "110001",
//             "websiteName": "WEBSTAGING",
//             "txnAmount": {
//                 "value": "1.00",
//                 "currency": "INR"
//             },
//             "userInfo": {
//                 "custId": "CUST_001"
//             }
//         },
//     },
//     "queryParams": {
//         "mid": "",
//         "orderId": "110001"
//     }
// }
//     let result = await paytmService.initiateTransaction(paytmObject);
// }

// test();

//createRoutes("/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/");
app.use(routes)
app.listen(3000);