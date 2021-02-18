var express = require('express');
var router = express.Router();
const apisController = require("../../controller/admin/apisController")

router.route("/generateImportCode").post(apisController.generateImportCode)


    

module.exports = router