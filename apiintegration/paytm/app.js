const express = require('express');
const app = express();
const generate = require('./ChecksumGeneration');
const constants = require('./constants')
const fs = require('fs');
const ejs = require('ejs');
const util = require('util');
const path = require('path');
const MODE_0666 = parseInt('0666', 8);
app.get('/', async (req, res) => {
    let orderId = (Math.random() * 1000).toString();
    let detailsForCode = {
        method: 'POST',
        url: 'https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=' + `${constants.mid}` + '&orderId=' + `${orderId}`,
        contentType: 'application/json',
        data: {
            body: {
                "requestType": "Payment",
                "mid": constants.mid,
                "websiteName": constants.website,
                "orderId": orderId,
                "txnAmount": { "value": "1.00", "currency": "INR" },
                "userInfo": { "custId": "CUST_001" },
                "callbackUrl": "https://merchant.com/callback"
            }
        },
    }
    let params = {
        dir: "/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/paytm/"
    }
    let app = await loadTemplate('./paytm.js');
    app.locals.details = detailsForCode.data;
    app.locals.method = detailsForCode.method;
    app.locals.url = detailsForCode.url;
    app.locals.auth = null;
    app.locals.contentType = detailsForCode.contentType;
    write(path.join(params.dir, 'code-generation.js'), app.render());
    res.send("success")
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


app.get('/test', async (req, res) => {
    const axios = require('axios');
    const generate = require('./ChecksumGeneration');
    let data = { "body": { "requestType": "Payment", "mid": "NUigXp26888780822392", "websiteName": "WEBSTAGING", "orderId": "725.1171490692083", "txnAmount": { "value": "1.00", "currency": "INR" }, "userInfo": { "custId": "CUST_001" }, "callbackUrl": "https://merchant.com/callback" } };
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
        data: data
    }

    axios(config)
        .then(function (response) {
            res.send(JSON.stringify(response.data))
        })
        .catch(function (error) {
            res.send(JSON.stringify(error))
        });
})



function write(file, str, mode) {
    fs.writeFileSync(file, str, { mode: MODE_0666 })
}

async function initializePaytmCode(detailsOfPaytm) {
    try {
        let constantCode = `PAYTM:{${'\n'}${'\t'}${'\t'} PAYTM_BASEURL: "${detailsOfPaytm.baseURL}",${'\n'}${'\t'}${'\t'}WEBSITE: "${detailsOfPaytm.website}" ,${'\n'}${'\t'}${'\t'}INDUSTRY_TYPE:"${detailsOfPaytm.Industry_Type}" ,${'\n'}${'\t'}${'\t'} CHANNEL_ID_WEB:"${detailsOfPaytm.Channel_ID_WEB}", ${'\n'}${'\t'}${'\t'} Channel_ID_APP:"${detailsOfPaytm.Channel_ID_APP}" }`

        let newcode;
        fs.readFile('/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/constant.js', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            var string = data.split("module.exports = {");
            newcode = "module.exports = {" + "\n" + "\t" + constantCode + "," + "\n" + string[1]
            write(path.join("/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/", './constant.js'), newcode);
        });


        let envCode = `${'\n'}PAYTM_MERCHANT_ID=${detailsOfPaytm.mid}${'\n'}PAYTM_MERCHANT_KEY=${detailsOfPaytm.mkey}${'\n'}`
        newcode = ""
        fs.readFile('/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/.env', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            newcode = data + envCode
            write(path.join("/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/", './.env'), newcode);

        });
    } catch (error) {
        return error;
    }

}

async function generateMultiplePaytmCode(APIsOfPaytm) {
    try {
        let fileExists;
        if (fs.existsSync("./ThirdPartyAPI/paytm.js")) {
            fileExists = true;
        } else {
            fileExists = false;
        }
        for (let i = 0; i < APIsOfPaytm.length; i++) {
            await generatePaytmAPI(APIsOfPaytm[i], fileExists, (error, data) => {
                if (error)
                    return error;
                console.log(data);
            })
            fileExists = true;
        }
        return ("success")
    } catch (error) {
        return error;
    }
}

async function generatePaytmAPI(objOfPaytmAPI, fileExists) {
    try {
        let app = await loadTemplate('paytmService');
        app.locals.details = objOfPaytmAPI.data;
        app.locals.method = objOfPaytmAPI.method;
        app.locals.url = objOfPaytmAPI.url;
        app.locals.methodName = objOfPaytmAPI.methodName;
        app.locals.fileExists = fileExists;
        if (fileExists) {
            const codetest = app.render();
            var newcode;
            let data = fs.readFileSync('/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/ThirdPartyAPI/paytm.js', 'utf8', function (err, data) {
                if (err) {
                    return error;
                }
                return data;

            });
            var string = data.split("module.exports = {");
            newcode = string[0] + codetest + "\n" + "module.exports = {" + "\n" + "\t" + objOfPaytmAPI.methodName + "," + string[1]
            write(path.join("/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/ThirdPartyAPI", './stripe.js'), newcode);
        } else {
            await write(path.join("/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/ThirdPartyAPI", './stripe.js'), app.render());
        }
        return "Success"
    } catch (error) {
        return error;
    }
}

module.exports = {
    initializePaytmCode,
    generateMultiplePaytmCode
}

app.listen(8000);;
