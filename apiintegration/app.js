var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const ejs = require('ejs');
const util = require('util');
//const MODE_0755 = parseInt('0755', 8)
const MODE_0666 = parseInt('0666', 8);
//const TEMPLATE_DIR = path.join(__dirname, 'views')
var app = express();

const routes = require("./routes/index")


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.get("/", (req, res) => {
    const appName = "RazorPay";
    const authentication = "SecretKey";
    let data = {
            appName: appName,
            authentication: authentication
        },


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
    console.log(' \x1b[36mcreate\x1b[0m : ' + file)
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

createRoutes("/home/dhwaniparekh/Coruscate_Saloni/POC/POC/apiintegration/");





app.use(routes)


app.listen(3000);