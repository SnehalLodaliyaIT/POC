var express = require('express');
var router = express.Router();
const marketPlacesOfUserController = require("../../controller/admin/marketPlacesOfUserController")
router.route("/create").post(marketPlacesOfUserController.addmarketPlacesOfUser)
router.route("/addBulk").post(marketPlacesOfUserController.bulkInsertmarketPlacesOfUser)


router.route("/list").get(marketPlacesOfUserController.findAllmarketPlacesOfUser)
router.route("/:id").get(marketPlacesOfUserController.getmarketPlacesOfUser)

router.route("/updateBulk").get(marketPlacesOfUserController.bulkUpdatemarketPlacesOfUser)
router.route("/update/:id").get(marketPlacesOfUserController.updatemarketPlacesOfUser)




router.route("/delete/:id").delete(marketPlacesOfUserController.deletemarketPlacesOfUser)


    

module.exports = router