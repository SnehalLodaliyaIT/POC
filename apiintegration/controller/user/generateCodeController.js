const utils = require("../../utils/messages")
const validation = require("../../utils/validateRequest");
const service = require("../../utils/dbService");
const fs=require('fs');
const path=require('path');
const ejs=require('ejs');
const util=require('util');
const MODE_0666 = parseInt('0666', 8);

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

let detailsForCode={
    "data":{},
    "method":"get",
    "url":"https://api.stripe.com/v1/customers",
    "auth":"Bearer sk_test_51IGODeLmKFVeRxasabVS8cGsHYNc99ClS7dReBchuh5ixIlxtGOUT0EPtPYqpwUd6zX33d430fBiOnXWdiS2066t00P7nusZQG",
    "contentType":"application/x-www-form-urlencoded",
    "dataType":"queryParams"
}

async function generateCode(req, res) {
    const params={...req.body}
    let app = await loadTemplate('code_snippet/js');
    app.locals.details = detailsForCode.data;
    app.locals.method = detailsForCode.method;
    app.locals.url =detailsForCode.url;
    app.locals.auth = detailsForCode.auth;
    app.locals.contentType = detailsForCode.contentType;
    app.locals.dataType = detailsForCode.dataType;
    write(path.join(params.dir, './test.js'), app.render());
    res.send("success")
}

let detailsForGoogleCode={
    "data":{},
    "method":"get",
    "url":"https://gmail.googleapis.com/gmail/v1/users/kajalmorker1@gmail.com/messages",
    "auth":"",
    "contentType":"",
    "dataType":""
}

async function generateGmailCode(req,res) {
    const params={...req.body}
    let app = await loadTemplate('code_snippet/gmailjs');
    app.locals.details =detailsForGoogleCode.data ;
    app.locals.method = detailsForGoogleCode.method;
    app.locals.url =detailsForGoogleCode.url;
    app.locals.auth =detailsForGoogleCode.auth;
    app.locals.contentType = detailsForGoogleCode.contentType;
    app.locals.dataType = detailsForGoogleCode.dataType;
    write(path.join(params.dir, './gmailtest.js'), app.render());
    res.send("success")
}


module.exports={
    generateCode  ,
    generateGmailCode       
}