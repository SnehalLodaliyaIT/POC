var express = require('express');
var router = express.Router();
const generateCodeController = require("../../controller/user/generateCodeController")

router.route("/generateImportCode").post(generateCodeController.generateCode)
router.route("/generateGmailCode").post(generateCodeController.generateGmailCode)


    

module.exports = router