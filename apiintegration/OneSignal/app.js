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
        url: "https://onesignal.com/api/v1/notifications",
        data: {
            app_id: constants.app_id,
            contents: { "en": "English Message" },
            included_segments: ["Subscribed Users"],
        },
        contentType: "application/json; charset=utf-8"
    }

    let params = {
        dir: "/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/OneSignal/"
    }
    let app = await loadTemplate('./one-signal.js');
    app.locals.details = detailsForCode.data;
    app.locals.method = detailsForCode.method;
    app.locals.url = detailsForCode.url;
    app.locals.auth = "Basic " + constants.api_key;
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
    let data = { "app_id": "14b7494e-1c0f-472c-a3f9-0fb57d246b70", "contents": { "en": "English Message" }, "included_segments": ["Subscribed Users"] };

    var config = {
        method: 'post',
        url: 'https://onesignal.com/api/v1/apps',
        headers: {
            'Authorization': 'Basic NmVkZTZhODMtYmMzZi00YTllLThmZmMtZWMxNGEwZWY3ZDE3',

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
