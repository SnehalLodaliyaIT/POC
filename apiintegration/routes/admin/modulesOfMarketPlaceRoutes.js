var express = require('express');
var router = express.Router();
const modulesOfMarketPlaceController = require("../../controller/admin/modulesOfMarketPlaceController")
router.route("/create").post(modulesOfMarketPlaceController.addmodulesOfMarketPlace)
router.route("/addBulk").post(modulesOfMarketPlaceController.bulkInsertmodulesOfMarketPlace)


router.route("/list").get(modulesOfMarketPlaceController.findAllmodulesOfMarketPlace)
router.route("/:id").get(modulesOfMarketPlaceController.getmodulesOfMarketPlace)

router.route("/updateBulk").get(modulesOfMarketPlaceController.bulkUpdatemodulesOfMarketPlace)
router.route("/update/:id").get(modulesOfMarketPlaceController.updatemodulesOfMarketPlace)




router.route("/delete/:id").delete(modulesOfMarketPlaceController.deletemodulesOfMarketPlace)


    

module.exports = router