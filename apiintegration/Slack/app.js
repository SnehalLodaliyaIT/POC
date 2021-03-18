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
        method: "POST",
        url: "https://slack.com/api/conversations.create",
        data: { "name": "something-urgent" },
        contentType: "application/json;charset=utf-8",
        auth: "Bearer " + constants.token
    }

    let params = {
        dir: "/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/Slack/"
    }
    let app = await loadTemplate('./slack.js');
    app.locals.details = detailsForCode.data;
    app.locals.method = detailsForCode.method;
    app.locals.url = detailsForCode.url;
    app.locals.auth = detailsForCode.auth;
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
    let data = { "name": "something-urgent" };

    var config = {
        method: 'POST',
        url: 'https://slack.com/api/conversations.create',
        headers: {

            'Content-Type': 'application/json;charset=utf-8',


            'Authorization': 'Bearer xoxp-1761069917364-1740130342359-1852977026151-b5d3c5338b567ea1f1c768044f64e4a0',

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


app.listen(8000);;
