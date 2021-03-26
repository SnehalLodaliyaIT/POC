var express = require('express');
var router = express.Router();
const generateCodeController = require("../../controller/user/generateCodeController")

router.route("/generateStripeCode").post(generateCodeController.generateStripeCode)
router.route("/generateImportCode").post(generateCodeController.generateCode)
router.route("/generateGmailCode").post(generateCodeController.generateGmailCode)
router.route("/generateMultipleCode").post(generateCodeController.generateMultipleCode)

    

module.exports = router