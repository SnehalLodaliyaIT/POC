const userService = require("../../services/user/generateCode");
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const util = require('util');
const MODE_0666 = parseInt('0666', 8);
const stripecode = require('../../STRIPE/app');
const razorpaycode = require('../../RAZORPAY/app');
const mailguncode = require('../../MAILGUN/app');
const twillocode = require('../../TWILLO/app');
const gitlabcode = require('../../GITLAB/app');
const paytmCode = require('../../paytm/app');
const dir="/home/snehallodaliya/Downloads/POC/POC/apiintegration/";

async function loadTemplate(name) {
    console.log(__dirname);

    let contents = fs.readFileSync(path.join('./', 'views', (name + '.ejs')), 'utf-8')
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

let detailsForCode = {
    "data": {},
    "method": "get",
    "url": "https://api.stripe.com/v1/customers",
    "auth": "Bearer sk_test_51IGODeLmKFVeRxasabVS8cGsHYNc99ClS7dReBchuh5ixIlxtGOUT0EPtPYqpwUd6zX33d430fBiOnXWdiS2066t00P7nusZQG",
    "contentType": "application/x-www-form-urlencoded",
    "dataType": "queryParams"
}

async function generateCode(req, res) {
    const params = { ...req.body }
    let app = await loadTemplate('code_snippet/js');
    app.locals.details = detailsForCode.data;
    app.locals.method = detailsForCode.method;
    app.locals.url = detailsForCode.url;
    app.locals.auth = detailsForCode.auth;
    app.locals.contentType = detailsForCode.contentType;
    app.locals.dataType = detailsForCode.dataType;
    write(path.join(params.dir, './test.js'), app.render());
    res.send("success")
}

let detailsForStripeCode = {
    "data": {},
    "method": "delete",
    "url": "https://api.stripe.com/v1/customers/cus_J7mYjvrGKAzIWD",
    "auth": "Bearer sk_test_51IGOMfBuOumXPWbaDEIJsTcnOJY2QdFc1CPiqLLjLmypWdoRzIFrCvPBduVUXeOhTELNxyM2V36s0xkdlh4v2t9E005eCsYGcr",
    "contentType": "application/x-www-form-urlencoded",
}

async function generateStripeCode(req, res) {
    let params = { ...req.body };
    let toolname = params.toolname;
    toolname = toolname.toLowerCase();
    switch (toolname) {
        case "stripe":
            await stripecode.generateStripeCode();
            break;

        case "razorpay":
            await razorpaycode.generateRazorPayCode();
            break;
        case "gmail":
            break;
        case "mailgun":
            await mailguncode.generateMailgunCode();
            break;
        case "twillo":
            await twillocode.generateTwilloCode();
            break;
        case "gitlab":
            await gitlabcode.generateGitlabCode();
            break;
        default:
        // code block
    }

    res.send("success")
}
let detailsForGoogleCode = {
    "data": {},
    "method": "get",
    "url": "https://gmail.googleapis.com/gmail/v1/users/kajalmorker1@gmail.com/messages",
    "auth": "",
    "contentType": "",
    "dataType": ""
}

async function generateGmailCode(req, res) {
    const params = { ...req.body }
    let app = await loadTemplate('code_snippet/gmailjs');
    app.locals.details = detailsForGoogleCode.data;
    app.locals.method = detailsForGoogleCode.method;
    app.locals.url = detailsForGoogleCode.url;
    app.locals.auth = detailsForGoogleCode.auth;
    app.locals.contentType = detailsForGoogleCode.contentType;
    app.locals.dataType = detailsForGoogleCode.dataType;
    write(path.join(params.dir, './gmailtest.js'), app.render());
    res.send("success")
}

async function generateMultipleCode(req, res) {
    try {
        const params = { ...req.body }
        let data = params.data;
        for (let i = 0; i < data.length; i++) {
            try {
                if (!fs.existsSync("./ThirdPartyAPI")) {
                    fs.mkdir(path.join(`${dir}`, 'ThirdPartyAPI'), async (err) => {
                        if (err) {
                            res.send(err);
                        }
                    });
                }
                switch (data[i].thirdPartyAPI) {
                    case "STRIPE":
                        try {
                            let result = await userService.generateCodeForStripe(data[i]);
                            res.send(result);
                        } catch (error) {
                            console.log(`An error occurred at generate ${data[i].thirdPartyAPI} 's API code...`);
                            res.send("Error for generate stripe code..", error);
                        }
                        break;
                    case "PAYTM":
                        try {
                            if (!fs.existsSync("./ThirdPartyAPI/paytm")) {
                                fs.mkdir(path.join(`${dir}ThirdPartyAPI`, 'paytm'), async (err) => {
                                    if (err) {
                                        res.send(err);
                                    }
                                });
                            }
                            if (!data[i].isRepeated) {
                                
                                await paytmCode.initializePaytmCode(data[i].Authentication, (error) => {
                                    res.send(error);
                                });
                            }
                            let result=await paytmCode.generateMultiplePaytmCode(data[i].APIs);
                            res.send(result)
                        } catch (error) {
                            console.log(`An error occurred at generate ${data[i].thirdPartyAPI} 's API code...`);
                            res.send(error)
                        }
                        break;
                    default:
                        break;
                }
            } catch (error) {
                res.send(error);
            }
        }
    } catch (error) {
        res.send(error)
    }

}

module.exports = {
    generateCode,
    generateGmailCode,
    generateMultipleCode,
    generateStripeCode
}