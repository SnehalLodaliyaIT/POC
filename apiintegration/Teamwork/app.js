const express = require('express');
const app = express();
const constants = require('./constants')
const fs = require('fs');
const ejs = require('ejs');
const util = require('util');
const path = require('path');
const MODE_0666 = parseInt('0666', 8);
app.get('/', async (req, res) => {

    let detailsForCode = {
        method: "get",
        url: constants.site_url + "/latestActivity.json",
        data: {
        },
        contentType: "",
        auth: "Basic " + new Buffer(constants.api_key + ":" + constants.password).toString("base64")

    }
    let params = {
        dir: "/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/Teamwork/"
    }
    let app = await loadTemplate('./teamwork.js');
    app.locals.details = detailsForCode.data;
    app.locals.method = detailsForCode.method;
    app.locals.url = detailsForCode.url;
    app.locals.auth = detailsForCode.auth;
    app.locals.contentType = detailsForCode.contentType;
    app.locals.paramType = "";
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
    let data = { "includeArchivedProjects": "false", "pageSize": "10", "page": "1" }


    let qs = require('qs');
    data = qs.stringify(data)


    var config = {
        method: 'get',
        url: 'https://coruscate3.teamwork.com//latestActivity.json',
        headers: {


            'Authorization': 'Basic dHdwX09QSFJ2c213aExhTG8yNjlIdjd1MHdXZjVzQWg6Q3MjODQ4ODk1MTMwMA==',


        },



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


app.listen(8000);;
