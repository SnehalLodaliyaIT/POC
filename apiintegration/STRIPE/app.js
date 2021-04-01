var path = require('path');
const fs = require('fs');
const stripe_constant = require('./constants');
const ejs = require('ejs');
const util = require('util');
const MODE_0666 = parseInt('0666', 8);

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

let detailsForStripeCode = {
    "data": {},
    "method": "get",
    "url": stripe_constant.baseURL + "customers",
    "auth": stripe_constant.auth,
    "contentType": stripe_constant.contentType,
    "methodName": "generateCustomer",
}
function write(file, str, mode) {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
    //console.log(' \x1b[36mcreate\x1b[0m : ' + file)
}

async function generateStripeCode() {
    let app = await loadTemplate('stripe');
    app.locals.details = detailsForStripeCode.data;
    app.locals.method = detailsForStripeCode.method;
    app.locals.url = detailsForStripeCode.url;
    app.locals.auth = detailsForStripeCode.auth;
    app.locals.contentType = detailsForStripeCode.contentType;
    write(path.join("/home/snehallodaliya/Downloads/POC/POC/apiintegration", './test.js'), app.render());
    console.log("success")
}
async function generateMultipleStripeCode(APIsOfStripe) {
    try {
        let fileExists;
        if (fs.existsSync("./ThirdPartyAPI/stripe.js")) {
            fileExists = true;
        } else {
            fileExists = false;
        }
        for (let i = 0; i < APIsOfStripe.length; i++) {
            await generateStripeAPI(APIsOfStripe[i], fileExists, (error, data) => {
                if (error)
                throw error;
                console.log(data);
            })
            fileExists = true;
        }
        return ("success")
    } catch (error) {
        throw error;
    }
}
async function generateStripeAPI(objOfStripeAPI, fileExists) {
    try {
        let app = await loadTemplate('stripeService');
        app.locals.details = objOfStripeAPI.body;
        app.locals.method = objOfStripeAPI.method;
        app.locals.url = objOfStripeAPI.url;
        app.locals.methodName = objOfStripeAPI.methodName;
        app.locals.fileExists = fileExists;
        app.locals.queryParams=objOfStripeAPI.queryParams;
        if (fileExists) {
            const codetest = app.render();
            var newcode;
            let data =  fs.readFileSync('/home/snehallodaliya/Downloads/POC/POC/apiintegration/ThirdPartyAPI/stripe.js', 'utf8', function (err, data) {
                if (err) {
                    throw error;
                }
                return data;

            });
            var string = data.split("module.exports = {");
            newcode = string[0] + codetest + "\n" + "module.exports = {" + "\n" + "\t" + objOfStripeAPI.methodName + "," + string[1]
            write(path.join("/home/snehallodaliya/Downloads/POC/POC/apiintegration/ThirdPartyAPI", './stripe.js'), newcode);
        } else {
          await  write(path.join("/home/snehallodaliya/Downloads/POC/POC/apiintegration/ThirdPartyAPI", './stripe.js'), app.render());
        }
        return "Success"
    } catch (error) {
        throw error;
    }
}
async function initializeStripeCode(detailsOfStripe) {
    try {
        let constantCode = `STRIPE:{${'\n'}${'\t'}${'\t'} STRIPE_BASEURL: "${detailsOfStripe.baseURL}",${'\n'}${'\t'}${'\t'}STRIPE_TOKEN_TYPE: "Bearer" ${'\n'}${'\t'} }`

        let newcode;
        fs.readFile('/home/snehallodaliya/Downloads/POC/POC/apiintegration/constant.js', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            var string = data.split("module.exports = {");
            newcode = "module.exports = {" + "\n" + "\t" + constantCode + "," + "\n" + string[1]
            write(path.join("/home/snehallodaliya/Downloads/POC/POC/apiintegration/", './constant.js'), newcode);

        });
        let envCode = `${'\n'}STRIPE_PUBLISHED_KEY=${detailsOfStripe.publishedKey}${'\n'}STRIPE_SECRET_KEY=${detailsOfStripe.secretKey}${'\n'}`
        newcode="";
        fs.readFile('/home/snehallodaliya/Downloads/POC/POC/apiintegration/.env', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            newcode = data + envCode
            write(path.join("/home/snehallodaliya/Downloads/POC/POC/apiintegration/", './.env'), newcode);

        });
    } catch (error) {
        throw error;
    }

}
module.exports = {
    generateStripeCode,
    generateMultipleStripeCode,
    initializeStripeCode,
    generateStripeAPI
}

