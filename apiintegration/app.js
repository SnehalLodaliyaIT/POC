var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const got = require("got");
const marketPlace = require('./model/marketPlace');
const master = require('./model/master');
const _ = require('lodash');


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

app.get('/test-paytm',async (req,res)=>{

        const Paytm = require('paytmchecksum');
        let mid = "NUigXp26888780822392";
        var data = {
        body:{
            "requestType":"Payment",
            "mid":mid ,
            "websiteName":"WEBSTAGING",
            "orderId":"10",
            "txnAmount":{"value":"1.00","currency":"INR"},
            "userInfo":{"custId":"CUST_001"},
            "callbackUrl":"https://merchant.com/callback"},
        }

        let signature = await Paytm.generateSignature(JSON.stringify(data.body),"ApCQ&NjRQIxALPqv");
        Object.assign(data,{head:{  
            "signature":signature}
        })
        
        data = JSON.stringify(data);
        var config = {
        method: 'POST',
        url: 'https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid='+`${mid}`+'&orderId=10',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length':data.length
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        res.send(response.data);
        })
        .catch(function (error) {
        res.send(error);
        });
})


app.get("/", async (req, res) => {
    const appName = "DemoApp";
    let data = await marketPlace.findOne({marketPlaceName:"RazorPay"});
    let authentication = _.map(data.authenticationTypeId,a=>{
        return a;
    });
    authentication = await master.find({_id: authentication });
    authentication = _.map(authentication,a=>{
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

function write(file, str, mode) {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
        //console.log(' \x1b[36mcreate\x1b[0m : ' + file)
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

async function generateCode(dir) {
    let app = loadTemplate('code_snippet/js');
    app.locals.details = {"amount": 50000,
    "currency": "INR",
    "receipt": "rcptid_11"};
    app.locals.method = "post";
    app.locals.url ="https://api.razorpay.com/v1/orders";
    app.locals.auth = "";
    app.locals.contentType = "application/json";
    app.locals.dataType = "";
    write(path.join(dir, './test.js'), app.render());
}

generateCode("/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/");


app.get('/test-stripe',async (req,res)=>{
    var axios = require('axios');
    var data = {};


    let qs = require('qs');
    data = qs.stringify(data) 


    var config = {
    method: 'get',
    url: 'https://api.stripe.com/v1/customers',
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer sk_test_51IGODeLmKFVeRxasabVS8cGsHYNc99ClS7dReBchuh5ixIlxtGOUT0EPtPYqpwUd6zX33d430fBiOnXWdiS2066t00P7nusZQG'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
    res.send(JSON.stringify(error));
    });
});


app.get('/test-razorpay',(req,res)=>{

    var axios = require('axios');
var data = {"amount":50000,"currency":"INR","receipt":"rcptid_12"};



var config = {
method: 'post',
url: 'https://api.razorpay.com/v1/orders',
headers: {
'Content-Type': 'application/json',
'Authorization':'Basic cnpwX3Rlc3RfNjNuNFAyUFpBZ09PdnQ6RkJ2UzlUMnFYZ1BlM0ZOTGcxMkZaOGFS'
},
data : data
};

axios(config)
.then(function (response) {
res.send(JSON.stringify(response))
})
.catch(function (error) {
res.send(JSON.stringify(error))
});

})
//createRoutes("/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/");
app.use(routes)
app.listen(3000);