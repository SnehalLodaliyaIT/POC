var express = require('express');
var router = express.Router();
const userController = require("../../controller/admin/userController")
router.route("/create").post(userController.adduser)
router.route("/addBulk").post(userController.bulkInsertuser)


router.route("/list").get(userController.findAlluser)
router.route("/:id").get(userController.getuser)

router.route("/updateBulk").get(userController.bulkUpdateuser)
router.route("/update/:id").get(userController.updateuser)




router.route("/delete/:id").delete(userController.deleteuser)


    

module.exports = router