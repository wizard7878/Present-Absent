const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/student/post/oneuser/:groupId/:name/:userid/:image',userController.postUserByForm) //send a student with froms to users collection


router.get('/admin/members/:groupId/',userController.get_showAllUsers)

router.get('/history/dates/:groupId',userController.adminHistory)

router.get('/history/:date/:groupId',userController.seeUsersHistory)

// ---- student

router.get('/student/info/:userid/:groupId',userController.studentInfo)

router.post('/student/submit/:userid/:groupId',userController.submitPresent)
router.post('/student/sendstudent/:userid/:groupid/:name/:userstatus',userController.SendStudent)
module.exports = router;