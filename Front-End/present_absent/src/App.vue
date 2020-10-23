<template>
  <div id="app" dir="rtl">
    <app-header>
         <div slot="switch-btn" > تاریخچه
      <label for="light">
          <input id="light" type="checkbox"  @click="changeComponent()"/>
          <div class="toggle-button" >
            <div class="switch"></div>
          </div>
        </label> امروز
    </div>
    </app-header>

    
    
    <component :is="selectedComponent"></component>
  </div>
</template>

<script>
import header from './components/Theheader'
import studentMain from './components/TheStudentMain'
import studentHistory from './components/TheStudentHistory'
import adminHistory from './components/TheAdminHistory'
import adminMain from './components/TheAdminMain'
import axios from 'axios'
const { W } = window
export default {
  name: 'App',
  data(){
    return{
      selectedComponent : '',
      componentFlag : true,
     
    }
  },
  components: {
    'app-header' : header,
    'app-student-main':studentMain,
    'app-student-history':studentHistory,
    'app-admin-main':adminMain,
    'app-admin-history':adminHistory
  },
  methods:{
    changeComponent(){
       if(this.$store.state.userStatus === 'Admin'){
         if (this.componentFlag){
            this.selectedComponent = 'app-admin-main'
         } else{
           this.selectedComponent = 'app-admin-history'
         }
       } 
       else if(this.$store.state.userStatus ==='member') { 
          if (this.componentFlag){
            this.selectedComponent = 'app-student-main'
         } else{
           this.selectedComponent = 'app-student-history'
         }
       }
      this.componentFlag = !this.componentFlag
      },

      async sendUser(){
        await axios.post(`http://${this.$store.state.Host}:${this.$store.state.Port}/users/student/sendstudent/${this.$store.state.userId}/${this.$store.state.groupId}/${this.$store.state.username}/${this.$store.state.userStatus}`)
    },
  },
    
    created(){
      
      W.initializeAsync().then(()=>{
        const {id,firstname,lastname,profileImage} = W.user.getInfo()
        const admins = W.wapp.getAdmins()
        const profileImageUrl = 'https://www.weblite.me:3000/image/' + profileImage
        this.$store.state.image = profileImageUrl
        this.$store.state.username = `${firstname} ${lastname}`
        this.$store.state.userId = id
        this.$store.state.userStatus = admins.includes(id) ? 'Admin' : 'member'
        this.changeComponent()
        
        this.sendUser()
      })
    },
    
}
    
</script>

<style>
  @font-face {
    font-family: 'vazir';
    src: url('/font/Vazir.ttf');
  }
  body{
    font-family: 'vazir';
  }
</style>
