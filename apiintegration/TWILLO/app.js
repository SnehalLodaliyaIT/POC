var path = require('path');
const fs = require('fs');
const twillo_constant = require('./constants');
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



let detailsForTwilloCode = {
    
    "data": {
        "Body":"hello test1",
        "From":"+18509902046"
    } ,
    "method": "get",
    "url": twillo_constant.baseURL + "Messages.json",
    "auth": twillo_constant.auth,
    "contentType": twillo_constant.contentType
}
function write(file, str, mode) {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
    //console.log(' \x1b[36mcreate\x1b[0m : ' + file)
}

async function generateTwilloCode() {
    console.log("twillo")
    let app = await loadTemplate('twillo');
    app.locals.details = Object.keys(detailsForTwilloCode.data).length?detailsForTwilloCode.data:false
    app.locals.method = detailsForTwilloCode.method;
    app.locals.url = detailsForTwilloCode.url;
    app.locals.auth = detailsForTwilloCode.auth;
    app.locals.contentType = detailsForTwilloCode.contentType;
    write(path.join("/home/snehallodaliya/Downloads/POC/POC/apiintegration", './test.js'), app.render());
    console.log("success")
}
module.exports = {
    generateTwilloCode
}
