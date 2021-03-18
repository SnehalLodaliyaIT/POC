const express =  require("express")
const router =  express.Router()

const masterRoutes =  require("./masterRoutes")
const userRoutes =  require("./userRoutes")
const marketplaceRoutes =  require("./marketPlaceRoutes")
const modulesofmarketplaceRoutes =  require("./modulesOfMarketPlaceRoutes")
const marketplacesofuserRoutes =  require("./marketPlacesOfUserRoutes")
const apisRoutes =  require("./apisRoutes")

router.use("/master",masterRoutes)
router.use("/user",userRoutes)
router.use("/marketplace",marketplaceRoutes)
router.use("/modulesofmarketplace",modulesofmarketplaceRoutes)
router.use("/marketplacesofuser",marketplacesofuserRoutes)
router.use("/apis",apisRoutes)

module.exports = router
