const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Marketplace = require('./models/marketPlace');
const Apis = require('./models/api');

const ejs = require('ejs');
const util = require('util');
//const MODE_0755 = parseInt('0755', 8)
const MODE_0666 = parseInt('0666', 8);
//const TEMPLATE_DIR = path.join(__dirname, 'views')

const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const masterRouter = require('./routes/master');
const testRouter = require('./routes/test');
const { ConnectionBase } = require('mongoose');
const port = process.env.PORT || '3000';
const app = express();

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//createRoutes();
let options = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "POC Testing",
            version: "1.0.0",
        },
        servers: [{
            url: "http://localhost:3000"
        }],
        components: {

        },
        security: [{
            bearerAuth: [],
        }, ],

    },
    apis: ['./routes/*.js']
}

let swaggerSpec = swaggerJSDoc(options);
app.use('/api', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/admin', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/master', masterRouter);
app.use('/test', testRouter);
module.exports = app;
app.listen(port, () => console.log(`server running on port ${port}`))

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

createRoutes("/home/dhwaniparekh/Coruscate_Saloni/POC/POC/POCApplication/");