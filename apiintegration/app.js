var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const got = require("got");
const marketPlace = require('./model/marketPlace');
const master = require('./model/master');
const _ = require('lodash');


const ejs = require('ejs');
const util = require('util');
//const MODE_0755 = parseInt('0755', 8)
const MODE_0666 = parseInt('0666', 8);
//const TEMPLATE_DIR = path.join(__dirname, 'views')
var app = express();

const routes = require("./routes/index");
const { required } = require('joi');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.get("/", async (req, res) => {
    const appName = "DemoApp";
    let data = await marketPlace.findOne({marketPlaceName:"RazorPay"});
    let authentication = _.map(data.authenticationTypeId,a=>{
        return a;
    });
    authentication = await master.find({_id: authentication });
    authentication = _.map(authentication,a=>{
        return a.name;
    });
    console.log(authentication);
    let app = loadTemplate('authentication/js');
    app.locals.appName = appName;
    app.locals.authentication = authentication;
    //const params = req.params.secretkey;
    //app.locals.key = "FBvS9T2qXgPe3FNLg12FZ8aR";
    const dir = "/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/";
    write(path.join(dir, './authentication.json'), app.render());
    res.send("ok");
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

function write(file, str, mode) {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
        //console.log(' \x1b[36mcreate\x1b[0m : ' + file)
}

async function createRoutes(dir) {
    let app = loadTemplate('routeTemplate.js');
    let data = new Array();
    let marketPlaceName = "github";
    let marketPlaceData = await Marketplace.findOne({ marketPlaceName: marketPlaceName });
    let apiData = await Apis.find({ marketPlaceId: marketPlaceData._id });
    apiData.forEach(element => {
        data.push(element);
    });
    app.locals.data = data;
    write(path.join(dir, './routes/test.js'), app.render());
}

//createRoutes("/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/");
app.use(routes)
app.listen(3000);