const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')


router.post('/register', adminController.registerAdmin)
router.post('/login', adminController.adminLogin)
router.post('/login', adminController.adminLogin)
router.get('/getUserData', adminController.getUserData)
router.put('/editUser', adminController.editUser)
router.post('/userBlock', adminController.userBlock )
router.post('/addUser', adminController.createUser )




module.exports = router