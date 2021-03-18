var path = require('path');
const fs = require('fs');
const gitlab_constant = require('./constants');
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



let detailsForGitlabCode = {
    "data": {},
    "method": "post",
    "url": gitlab_constant.baseURL + "projects/",
    "auth": gitlab_constant.auth,
    "contentType": gitlab_constant.contentType,
}
function write(file, str, mode) {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
    //console.log(' \x1b[36mcreate\x1b[0m : ' + file)
}

async function generateGitlabCode() {
    
    let app = await loadTemplate('gitlab');
    app.locals.details = Object.keys(detailsForGitlabCode.data).length?detailsForGitlabCode.data:false;
    app.locals.method = detailsForGitlabCode.method;
    app.locals.url = detailsForGitlabCode.url;
    app.locals.auth = detailsForGitlabCode.auth;
    app.locals.contentType = detailsForGitlabCode.contentType;
    write(path.join("/home/snehallodaliya/Downloads/POC/POC/apiintegration", './test.js'), app.render());
    console.log("success")
}


module.exports = {
    generateGitlabCode
}
