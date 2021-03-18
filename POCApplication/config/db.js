const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kajal:kajal123@poc.pfqu7.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
module.exports = db;