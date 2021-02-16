var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();
const routes =  require("./routes/index")


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let object={
    "MarketPlaceName":"RAZORPAY",
    "marketPlaceId":"602b59d345ed5b313d0cf2b4",
    "description":"It's payment gateway."
}



app.use(routes)


app.listen(3000);
