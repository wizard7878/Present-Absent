const Controller = require("./Controller");
const History = require("../models/history");
const Users = require('../models/storeUsers')
const m = require('jalali-moment')


class UserController extends Controller {

  getPersianDate(){
    m.locale('fa')
    let enDate = new Date()
    let persianDate = m.from(`${enDate.getFullYear()}-${enDate.getMonth() + 1}-${enDate.getDate()}`, 'en', 'YYYY-MM-DD').format()
    let date = persianDate.slice(0,10)
    return date

  }
  async postUserByForm(req,res){
    // if wasnt that wis id
    if(await Users.find({wisId:req.params.groupId}) == false){
      let user = new Users({
        wisId: req.params.groupId
      })
    await user.save()
      }

    let oneuser = {
      user_id:req.params.userid,
      name:req.params.name,
      image:req.params.image
    }

    // if wasnt that user
    if(await Users.find({'users.user_id':req.params.userid,wisId:req.params.groupId}) == false){
        await Users.updateOne({
          wisId: req.params.groupId
        },{
          $push:{users:oneuser}
        })
        res.send(true)
      }else{

        res.send(false)
      }
    }


  async SendStudent(req,res){
    let today = this.getPersianDate();
    if ((await History.find({
        date: today,
        groupid: req.params.groupid,})) == false
    ) {
      let addItem = new History({
        date: today,
        groupid: req.params.groupid,
      });

      await addItem.save();

    }

    let userCollection = await Users.find({wisId:req.params.groupid})
    userCollection.forEach(async (userDocument) =>{
      console.log(userDocument.users)
      userDocument.users.forEach( async(item) =>{

        if(await History.find({groupid:req.params.groupid,'users.user_id':item.user_id,date:today}) == false){
          let member = {
            user_id : item.user_id,
            name : item.name,
            present_status : false,
            present_date : `${today}`,
            image:item.image
          }
          if(req.params.userstatus === 'member'){
            await History.updateOne(
              {
                groupid: req.params.groupid,
                date: today,
              },
              { $push: { users: member } }
            );
            }
        }
      })

      })

    res.send('Succssfully')

  }



  async get_showAllUsers(req,res){
    let today = this.getPersianDate();
    let retUsers = await History.find({ groupid: req.params.groupId,date:today });
    return res.send(retUsers[0].users);

  }

  async adminHistory(req, res) {
    let dates = await History.find({ groupid: req.params.groupId });
    let arr = [];
    dates.forEach((his) => {
      arr.push(his.date);
    });
    return res.send(arr);
  }

  async seeUsersHistory(req, res) {
    let users = await History.find({
      date: req.params.date,
      groupid: req.params.groupId,
    });
    res.send(users);
  }

  async studentInfo(req, res) {
    let present = await History.find({ groupid: req.params.groupId });
    let his = [];
    let counter = { present: 0, absent: 0 };
    present.forEach((el) => {
      el.users.forEach((usr) => {
        if (usr.user_id === req.params.userid) {
          his.push(usr);
          usr.present_status == true
            ? (counter.present += 1)
            : (counter.absent += 1);
        }
      });
    });
    res.send([his, counter]);
  }

  async submitPresent(req, res) {
    let today = this.getPersianDate()
    let date = new Date()
    console.log(today)
    if(await History.find({date:today,users:{$elemMatch:{user_id:req.params.userid,present_status:true}}}) == false){
      await History.update({groupid:req.params.groupId,'users.user_id':req.params.userid,date:today},{$set:{'users.$.present_status':true,'users.$.present_date':`${today} -- ${date.getHours()}:${date.getMinutes()}`}})
      res.send(true)
    } else {
      res.send(false)
    }

  }
}

module.exports = new UserController();
