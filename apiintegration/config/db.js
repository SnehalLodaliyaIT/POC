const mongoose = require("mongoose")
const uri = 'mongodb+srv://kajal:kajal123@poc.pfqu7.mongodb.net/test'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection

db.once("open", () => {
    console.log("Connection Successeed")
})

db.on("error", () => {
    console.log("Error in Connect Mongo")
})

module.exports = mongoose