var express = require('express');
var router = express.Router();
const marketPlaceController = require("../../controller/admin/marketPlaceController")
router.route("/create").post(marketPlaceController.addmarketPlace)
router.route("/addBulk").post(marketPlaceController.bulkInsertmarketPlace)


router.route("/list").get(marketPlaceController.findAllmarketPlace)
router.route("/:id").get(marketPlaceController.getmarketPlace)

router.route("/updateBulk").get(marketPlaceController.bulkUpdatemarketPlace)
router.route("/update/:id").get(marketPlaceController.updatemarketPlace)




router.route("/delete/:id").delete(marketPlaceController.deletemarketPlace)


    

module.exports = router