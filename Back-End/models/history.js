const mongoose = require('mongoose');


const HistorySchema = new mongoose.Schema({
    date:{type:String,required:false},
    groupid:String,
    users:[{
        user_id: String,
        name:String,
        image:String,
        present_status:{type:Boolean,default:false}, // fa Absent --- tr Present
        present_date:{type:String},
    }]
    
})
const History = mongoose.model('History',HistorySchema,'History')







module.exports = History;