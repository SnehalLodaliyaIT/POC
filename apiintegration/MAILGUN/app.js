var path = require('path');
const fs = require('fs');
const mailgun_constant = require('./constants');
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



let detailsForMailgunCode = {
    
    "data": {
        'name':'abc',
        'password':'123'
    },
    "method": "get",
    "url": mailgun_constant.baseURL + "domains",
    "auth": mailgun_constant.auth,
    "contentType": mailgun_constant.contentType,
}
function write(file, str, mode) {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
    //console.log(' \x1b[36mcreate\x1b[0m : ' + file)
}

async function generateMailgunCode() {
    let app = await loadTemplate('mailgun');
    app.locals.details = Object.keys(detailsForMailgunCode.data).length?detailsForMailgunCode.data:false
    app.locals.method = detailsForMailgunCode.method;
    app.locals.url = detailsForMailgunCode.url;
    app.locals.auth = detailsForMailgunCode.auth;
    app.locals.contentType = detailsForMailgunCode.contentType;
    write(path.join("/home/snehallodaliya/Downloads/POC/POC/apiintegration", './test.js'), app.render());
    console.log("success")
}
module.exports = {
    generateMailgunCode
}
