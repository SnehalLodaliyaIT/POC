var express = require('express');
var router = express.Router();
const apisController = require("../../controller/admin/apisController")
router.route("/create").post(apisController.addapis)
router.route("/addBulk").post(apisController.bulkInsertapis)


router.route("/list").get(apisController.findAllapis)
router.route("/:id").get(apisController.getapis)

router.route("/updateBulk").get(apisController.bulkUpdateapis)
router.route("/update/:id").get(apisController.updateapis)




router.route("/delete/:id").delete(apisController.deleteapis)


    

module.exports = router