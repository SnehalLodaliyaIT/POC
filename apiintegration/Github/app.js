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
        url: "https://api.github.com/user?access_token=" + constants.access_token,
        data: {},
        contentType: "",
        auth: "",
        Accept: "application/vnd.github.v3+json"
    }

    let params = {
        dir: "/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/Github/"
    }
    let app = await loadTemplate('./github.js');
    app.locals.details = detailsForCode.data;
    app.locals.method = detailsForCode.method;
    app.locals.url = detailsForCode.url;
    app.locals.auth = detailsForCode.auth;
    app.locals.contentType = detailsForCode.contentType;
    app.locals.Accept = detailsForCode.Accept
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
    let data =
        {}


    var config = {
        method: 'GET',
        url: 'https://api.github.com/user?access_token=8b1969e565dbb5aabd2d8008673dc3f1db21198c',
        headers: {



            'Accept': 'application/vnd.github.v3+json'


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
