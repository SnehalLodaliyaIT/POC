var express = require('express');
var router = express.Router();
const masterController = require("../../controller/admin/masterController")
router.route("/create").post(masterController.addmaster)
router.route("/addBulk").post(masterController.bulkInsertmaster)


router.route("/list").get(masterController.findAllmaster)
router.route("/:id").get(masterController.getmaster)

router.route("/updateBulk").get(masterController.bulkUpdatemaster)
router.route("/update/:id").get(masterController.updatemaster)




router.route("/delete/:id").delete(masterController.deletemaster)


    

module.exports = router