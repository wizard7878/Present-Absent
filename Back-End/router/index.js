const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    res.send("Hello Again!")
})

router.use('/users',require('./users'))

router.all('*',(req,res)=>{
    res.send("404 NotFound!")
})

module.exports = router;