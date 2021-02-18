var express = require('express');
var router = express.Router();
const importCodeController = require("../../controller/user/importCodeController")

router.route("/generateImportCode").post(importCodeController.generateImportCode)


    

module.exports = router