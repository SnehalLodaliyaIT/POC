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
module.exports = {
    generateStripeCode
}
