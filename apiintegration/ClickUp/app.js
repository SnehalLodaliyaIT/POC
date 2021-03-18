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
        method: "GET",
        url: "https://api.clickup.com/api/v2/team",
        data: {},
        contentType: "",
        auth: "Bearer " + constants.personal_token
    }

    let params = {
        dir: "/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/ClickUp/"
    }
    let app = await loadTemplate('./clickup.js');
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
    let data = {};



    var config = {
        method: 'GET',
        url: 'https://private-anon-da436f84e9-clickup20.apiary-mock.com/api/v2/team',
        headers: {


            'Authorization': 'Bearer pk_3377822_Q6FZBYJTK3I2U8AV5MIFQ8UR8G1U6SJ9',

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
