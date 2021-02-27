const express =  require("express")
const router =  express.Router()

const generateCodeRoutes =  require("./generateCodeRoutes")


router.use("/generateCode",generateCodeRoutes)


module.exports = router
