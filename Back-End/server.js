const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors')
const app = express()
app.use(cors())
app.use(express.urlencoded({extended:false}))
mongoose.connect('mongodb://localhost:27017/weblite', {useNewUrlParser: true, useUnifiedTopology: true});

app.use('/',require('./router/index'))

app.listen(3000,()=>{
    console.log("Server is Working on 3000")
})