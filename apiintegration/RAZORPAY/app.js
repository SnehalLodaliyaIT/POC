var path = require('path');
const fs = require('fs');
const razorpay_constant = require('./constants');
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



let detailsForRazorPayCode = {
    "data": {},
    "method": "post",
    "url": razorpay_constant.baseURL + "customers",
    "auth": razorpay_constant.auth,
    "contentType": razorpay_constant.contentType,
}
function write(file, str, mode) {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
    //console.log(' \x1b[36mcreate\x1b[0m : ' + file)
}

async function generateRazorPayCode() {
    
    let app = await loadTemplate('razorPay');
    app.locals.details = detailsForRazorPayCode.data;
    app.locals.method = detailsForRazorPayCode.method;
    app.locals.url = detailsForRazorPayCode.url;
    app.locals.auth = detailsForRazorPayCode.auth;
    app.locals.contentType = detailsForRazorPayCode.contentType;
    write(path.join("/home/snehallodaliya/Downloads/POC/POC/apiintegration", './test.js'), app.render());
    console.log("success")
}

async function generateBasicToken(){
    var request = require('request'),
    username = "rzp_test_fwZKxAdr4dT7vG",
    password = "mYrRhK5XDmVt8cViUHsit2yr",
    url = "https://api.razorpay.com",
    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
    console.log(auth);

}
module.exports = {
    generateRazorPayCode
}
