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

async function generateCode(req,res) {
    const params={...req.body}
    let app = await loadTemplate('code_snippet/js');
    app.locals.details = {};
    app.locals.method = "get";
    app.locals.url ="https://gmail.googleapis.com/gmail/v1/users/kajalmorker1@gmail.com/messages";
    app.locals.auth = "Bearer ya29.A0AfH6SMB4Fkl1pqFHEoOOuvoI8QxcdumvsADr5lTKZPeI6u8rmK10S5Nwch-Erugwrwdl2SxY22zLVS5J63lQ1iOMsvxy0O_PNRYcSIuqpUSwKU4TXvfwoht0mXkCXJIQaumT6qws7SUoqigzA4JEn6LQxYZF";
    app.locals.contentType = "";
    app.locals.dataType = "";
    write(path.join(params.dir, './test.js'), app.render());
    res.send("success")
}

async function generateGmailCode(req,res) {
    const params={...req.body}
    let app = await loadTemplate('code_snippet/gmailjs');
    app.locals.details = {};
    app.locals.method = "get";
    app.locals.url ="https://gmail.googleapis.com/gmail/v1/users/kajalmorker1@gmail.com/messages";
    app.locals.auth = "Bearer ya29.A0AfH6SMCU2P6lzE5fcSK1OEi94AUzD6667dt_Po-BMrBZ6cX2uTm9GDAScKPAteJOZ-mYZ0mEgUsgUQDdbPy23eqiSrRd2KNklIWKMqwoWQgiEvoH_WklYPkqcf2lM0RPv6bknE3e3P1JjqQWq_e77ki41LYs";
    app.locals.contentType = "";
    app.locals.dataType = "";
    write(path.join(params.dir, './gmailtest.js'), app.render());
    res.send("success")
}


module.exports={
    
    generateCode  ,
    generateGmailCode       
}