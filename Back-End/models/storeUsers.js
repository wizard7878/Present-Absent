const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    wisId:String,
    users:[{
        user_id: String,
        name:String,
        image:String,
    }]
    
})
const Users = mongoose.model('Users',UsersSchema,'Users')


module.exports = Users