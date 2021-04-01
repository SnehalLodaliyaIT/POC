const express = require('express');
const app = express();
const generate = require('./ChecksumGeneration');
const constants = require('./constants')
const fs = require('fs');
const ejs = require('ejs');
const util = require('util');
const path = require('path');
const MODE_0666 = parseInt('0666', 8);
const dir = "/home/snehallodaliya/Downloads/POC/POC/apiintegration/";
const service = require("../utils/dbService");
const apis = require("../model/apis")
const constant = require("../config/constant/common")


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
        fs.readFile(`${dir}constant.js`, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            var string = data.split("module.exports = {");
            newcode = "module.exports = {" + "\n" + "\t" + constantCode + "," + "\n" + string[1]
            write(path.join(`${dir}`, './constant.js'), newcode);
        });


        let basicToken = "Basic " + Buffer.from(`${detailsOfPaytm.mid}` + ":" + `${detailsOfPaytm.mkey}`).toString('base64');
        let envCode = `${'\n'}PAYTM_MERCHANT_ID=${detailsOfPaytm.mid}${'\n'}PAYTM_MERCHANT_KEY=${detailsOfPaytm.mkey}${'\n'}PAYTM_AUTH=${basicToken}${'\n'}`
        newcode = ""
        fs.readFile(`${dir}.env`, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            newcode = data + envCode
            write(path.join(`${dir}`, './.env'), newcode);

        });

        fs.copyFile(`${dir}paytm/PaytmChecksum.js`, `${dir}ThirdPartyAPI/paytm/PaytmChecksum.js`, (err) => {
            if (err)
                throw err;
            console.log('source.txt was copied to destination.txt');
        });

    } catch (error) {
        throw error;
    }

}

async function generateMultiplePaytmCode(APIsOfPaytm) {
    try {
        let fileExists;
        if (fs.existsSync("./ThirdPartyAPI/paytm/paytm.js")) {
            fileExists = true;
        } else {
            fileExists = false;
        }
        let result;
        for (let i = 0; i < APIsOfPaytm.length; i++) {
            result = await generatePaytmAPI(APIsOfPaytm[i], fileExists);
            fileExists = true;
        }
        return (result)
    } catch (error) {
        throw error;
    }
}

async function generatePaytmAPI(objOfPaytmAPI, fileExists) {
    try {
        let app = await loadTemplate('paytmService1');
        app.locals.details = objOfPaytmAPI.data;
        app.locals.method = objOfPaytmAPI.method;
        app.locals.url = objOfPaytmAPI.url;
        app.locals.methodName = objOfPaytmAPI.methodName;
        app.locals.fileExists = fileExists;
        app.locals, queryParams = objOfPaytmAPI.queryParams;
        app.locals.APIType = objOfPaytmAPI.APIType;
        if (fileExists) {
            const codetest = app.render();
            var newcode;
            //saloni path =dhwaniparekh/Coruscate_Saloni
            let data = fs.readFileSync(`${dir}ThirdPartyAPI/paytm/paytm.js`, 'utf8', function (err, data) {
                if (err) {
                    throw error;
                }
                return data;

            });
            var string = data.split("module.exports = {");
            newcode = string[0] + codetest + "\n" + "module.exports = {" + "\n" + "\t" + objOfPaytmAPI.methodName + "," + string[1]
            write(path.join(`${dir}ThirdPartyAPI/paytm/`, 'paytm.js'), newcode);
        } else {
            console.log("file not exists")
            write(path.join(`${dir}ThirdPartyAPI/paytm/`, 'paytm.js'), app.render());
        }
        generateControllerCode(objOfPaytmAPI.id,objOfPaytmAPI.methodName)
        return "Success"
    } catch (error) {
        throw error;
    }
}

async function generateControllerCode(APIId,APIName) {
    try {
        let result = await service.getSingleDocumentById(apis, APIId);
        result = result.toJSON();
        let paytmObject = {};
        for (let i = 0; i < result.parameters.length; i++) {
            const params = result.parameters[i];
            switch (params.type) {
                case constant.PARAMETER_TYPE.REQUEST_PARAMETER.toString():
                    let requestParams = result.parameters[i].parameters;
                    let objRequestParams = {};
                    for (let rp = 0; rp < requestParams.length; rp++) {
                        switch (requestParams[rp].type) {
                            case "string":
                                objRequestParams[requestParams[rp].name] = "";
                                break;
                            case "number":
                                objRequestParams[requestParams[rp].name] = "";
                                break;
                            case "Object":
                                let param = await generateObjectParams(requestParams[rp]);
                                objRequestParams[requestParams[rp].name] = param;
                                break;
                            case "array":
                                let arrayObj = await generateArrayParams(requestParams[rp]);
                                objRequestParams[requestParams[rp].name] = arrayObj;
                                break;
                            case "custom":
                                objRequestParams[requestParams[rp].name] = {};
                                break;
                            default:
                                break;
                        }
                    }
                    paytmObject["requestParams"] = objRequestParams;
                    break;
                case constant.PARAMETER_TYPE.PATH_PARAMETER.toString():
                    let pathParams = result.parameters[i].parameters;
                    let objPathParams = {};
                    for (let pp = 0; pp < pathParams.length; pp++) {
                        switch (pathParams[pp].type) {
                            case "string":
                                objPathParams[pathParams[pp].name] = ""
                                break;
                            case "number":
                                objPathParams[pathParams[pp].name] = ""
                                break;
                            default:
                                break;
                        }
                    }
                    paytmObject[pathParams] = objPathParams;
                    break;
                case constant.PARAMETER_TYPE.QUERY_PARAMETER.toString():
                    let queryParams = result.parameters[i].parameters;
                    let objQueryParams = {};
                    for (let qp = 0; qp < queryParams.length; qp++) {
                        switch (queryParams[qp].type) {
                            case "string":
                                objQueryParams[queryParams[qp].name] = ""
                                break;
                            case "number":
                                objQueryParams[queryParams[qp].name] = ""
                                break;
                            default:
                                break;
                        }
                    }
                    paytmObject["queryParams"] = objQueryParams;
                    break;
                default:
            }
        }
        let controllerCode=`let paytmService=require('../../ThirdPartyAPI/paytm/paytm');${'\n'}let paytmObject = ${JSON.stringify(paytmObject,null,2)}${'\n'}let result=await paytmService.${APIName}(paytmObject);`
        console.log("controllercode",controllerCode)
        write(path.join(`${dir}controller/user/`, 'paymentController.js'), controllerCode);
    } catch (error) {
        throw error;
    }

}

async function generateObjectParams(objOfParam) {
    let generateObj = {};
    let childParams = objOfParam.childParams;
    for (let cp = 0; cp < childParams.length; cp++) {
        switch (childParams[cp].type) {
            case "string":
                generateObj[childParams[cp].name] = "";
                break;
            case "number":
                generateObj[childParams[cp].name] = "";
                break;
            case "Object":
                let cpparam = await generateObjectParams(childParams[cp]);
                generateObj[childParams[cp].name] = cpparam;
                break;
            case "array":
                generateObj[childParams[cp].name] = [];
                break;
            case "custom":
                generateObj[childParams[cp].name] = {};
                break;
            default:
                break;
        }
    }
    return generateObj;
}

async function generateArrayParams(objOfParam) {
    let generateArray = [];
    let generateObj = {};
    let childParams = objOfParam.childParams;
    for (let cp = 0; cp < childParams.length; cp++) {
        switch (childParams[cp].type) {
            case "string":
                generateObj[childParams[cp].name] = "";
                break;
            case "number":
                generateObj[childParams[cp].name] = "";
                break;
            case "Object":
                let cpparam = await generateObjectParams(childParams[cp]);
                generateObj[childParams[cp].name] = cpparam;
                break;
            case "array":
                let arrayObj = await generateArrayParams(childParams[cp]);
                generateObj[childParams[cp].name] = arrayObj;
                break;
            case "custom":
                generateObj[childParams[cp].name] = {};
                break;
            default:
                break;
        }
    }
    generateArray.push(generateObj);
    return generateArray;
}

module.exports = {
    initializePaytmCode,
    generateMultiplePaytmCode,
    generateControllerCode
}

app.listen(8000);;
