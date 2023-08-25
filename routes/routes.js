const express = require ( 'express' )
const { registerView, loginView, registerUser, loginUser } = require ( '../controllers/loginController' )
const router = express.Router ()
const { protectRoute } = require ( "../auth/protect" )
const { homeView } = require ( "../controllers/homeController" )
const { 
  createItem, 
  changeItemTable, 
  filterMetalItemTable, 
  filterManufacturerItemTable, 
  filterPriceItemTable, 
  filterThreeParams 
} = require ( "../controllers/itemController" )
const { order, getOrders, deleteOrder, orderSumAverage } = require ( "../controllers/orderController" ) 
const { getAllClients } = require ( "../controllers/directorController" )
const { getCurrency } = require ( "../controllers/currencyController" )
const { playVideo } = require ( "../controllers/videoController" )
const { addStore, getStores, deleteStore } = require ( "../controllers/storeController" )
const { createFBPosting} = require ( "../controllers/fbController" )

router.get ( '/', registerView )
router.get ( '/register', registerView )
router.get ( '/login', loginView )
router.get ( "/home", protectRoute, homeView )
router.get ( "/logout", loginView )

router.get ( "/clearFilters", protectRoute, homeView )

router.get ( '/video', playVideo )

router.post ( "/register", registerUser )
router.post ( "/login", loginUser )

router.post ( "/getAllClients", getAllClients )

router.post ( "/createItem", createItem ) 
router.post ( "/changeItemTable", changeItemTable )
router.post ( "/filterMetalItemTable", filterMetalItemTable )
router.post ( "/filterManufacturerItemTable", filterManufacturerItemTable )
router.post( "/filterPriceItemTable", filterPriceItemTable )
router.post( "/filterThreeParams", filterThreeParams )

router.post ( "/order", order )
router.post ( "/getOrders", getOrders )
router.post ( "/deleteOrder", deleteOrder )
router.post ( "/orderSumAverage", orderSumAverage )

router.post ( "/getCurrency", getCurrency )

router.post ( "/addStore", addStore )
router.post ( "/getStores", getStores )
router.post ( "/deleteStore", deleteStore )

router.post ( "/createFBPosting", createFBPosting )

module.exports = router
