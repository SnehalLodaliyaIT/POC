const express =  require("express")
const router =  express.Router()

const importCodeRoutes =  require("./importCodeRoutes")


router.use("/importCode",importCodeRoutes)


module.exports = router
