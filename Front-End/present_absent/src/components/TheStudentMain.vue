<template>
  <div>
       <div class="d-flex justify-content-center">
     <button class="btn btn-raised btn-warning btn-lg mt-3" data-toggle="modal" data-target="#modelId">ثبت نام</button>
     
     <!-- Modal -->
     <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
         <div class="modal-dialog" role="document">
             <div class="modal-content">
                     <div class="modal-header">
                         <h5 class="modal-title">ثبت نام</h5>
                     </div>
                        
                 <div class="modal-body">
                     <div class="container-fluid">
                         <input class="form-control" v-model="usernameForm" placeholder="نام خود را وارد کنید">
                     </div>
                 </div>
                 <div class="modal-footer">
                     <button type="button" class="btn btn-secondary" data-dismiss="modal">انصراف</button>
                     <button @click="sendUser" type="button" class="btn btn-primary" data-dismiss="modal">تایید</button>
                 </div>
             </div>
         </div>
     </div>
     
        

 </div>
    <div class="d-flex justify-content-center mt-2" v-if="show">
      <canvas class="mt-5" id="myChart"></canvas>
      {{ chart() }}
    </div>

     <div class="d-flex justify-content-center align-items-center mt-5" v-if="show == false">
        <img width="100" height="100" src="img/Rolling-1s-200px.gif">
    </div>

    <div class="d-flex justify-content-center mt-5">
      <button
        @click="submitPresent()"
        class="btn btn-success btn-raised btn-lg mt-2 mb-5"
      >
        تایید حضور
      </button>
      
    </div>

      <!-- notification container -->

      <div class="notification ">
        <div class="notification-header">
          <span class=""></span>
          <h1 class="notification-title"></h1>
        </div>
        <div class="notification-body text-right">
          <p></p>
        </div>
        <div class="notification-progress-time"></div>
      </div>
   
   
  </div>
</template>

<script>
import { Chart } from "chart.js";
import axios from 'axios'
export default {
  data() {
    return {
      present_counter: 0,
      absent_counter: 0,
      active: true,
      show:true,
      usernameForm : '',
      checkSuccessfullyRegistered : ''
    };
  },
  methods: {
    chart() {

      window.onload = function() {
        var ctx = document.getElementById("myChart");
        new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["غیاب", "حضور"],
            datasets: [
              {
                label: "# of Tomatoes",
                data: [this.absent_counter,this.present_counter],
                backgroundColor: ["#FF3D00", "#03A9F4"],
                borderColor: ["#FF3D00", "#43A047"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
          },
        });
      };
    },

      async submitPresent() {
      let res = await axios.post(`https://${this.$store.state.Host}/users/student/submit/${this.$store.state.userId}/${this.$store.state.groupId}`)
      if(res.data === false){
        this.showMessage('#fb4443','خطا','خطا','حضور شما قبلا ثبت شده')
      }
     else {
        this.showMessage('#46a149','موفق','fa fa-check-square','حضور شما با موفقیت تایید شد')
      }
  
   },

    async sendUser(){
      this.$store.state.username = this.usernameForm
      let ProfileImage = this.$store.state.image.split('').map(x => x === '/' ? '*' : x).join('')
      let res = await axios.post(`https://${this.$store.state.Host}/users/student/post/oneuser/${this.$store.state.groupId}/${this.$store.state.username}/${this.$store.state.userId}/${ProfileImage}`)
      await axios.post(`https://${this.$store.state.Host}/users/student/sendstudent/${this.$store.state.userId}/${this.$store.state.groupId}/${this.$store.state.username}/${this.$store.state.userStatus}`)
      if(res.data === false){
        this.showMessage('#fb4443','خطا','خطا','شما قبلا ثبت نام کرده اید')
      }
      else if(res.data === '404 NotFound!'){
         this.showMessage('#fb4443','خطا','خطا','فیلد نام نمیتواند خالی باشد')
      } else {
        this.showMessage('#46a149','ثبت نام موفق','fa fa-check-square','ثبت نام شما با موفقیت انجام شد')
      }
    },





    showMessage(color, title, iconClassName, message) {
       let notification = document.querySelector(".notification");
       notification.style.display = 'block'
      // access the progress timer element for showing a left over time
      const progressElement = notification.querySelector(
        ".notification-progress-time"
      );
      notification.classList.add("active");
      notification.style.background = color;
      notification.querySelector("h1").textContent = title;
      notification.querySelector("span").className = iconClassName;
      notification.querySelector("p").textContent = message;
      let progressTimer = 100;
      // set interval for message timer
      let timer = setInterval(() => {
        progressTimer--;
        progressElement.style.width = progressTimer + "%";
        if (progressTimer == 0) {
          clearInterval(timer);
          notification.classList.remove("active");
          progressElement.style.width = 100 + "%";
        }
      }, 50);
    }
    
  },

  async mounted() {
    
    let checkStatistics = await axios(`https://${this.$store.state.Host}/users/student/info/${this.$store.state.userId}/${this.$store.state.groupId}`) 
        this.present_counter = checkStatistics.data[1].present
        this.absent_counter = checkStatistics.data[1].absent
        
        this.show = true
    var ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["غیاب", "حضور"],
        datasets: [
          {
            label: "# of Tomatoes",
            data: [this.absent_counter,this.present_counter],
            backgroundColor: ["#FF3D00", "#03A9F4"],
            borderColor: ["#FF3D00", "#43A047"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

  },
  


};
</script>

<style scoped>

  .notification {
    display: none;
  position: absolute;
  bottom: 9em;
  /* right: -22em; */
  border-radius: 5px;
  width: 350px;
  overflow: hidden;
  opacity: 0;
  transition: all 0.2s;
}
.notification.active {
  right: 2em;
  opacity: 1;
}
.notification-header {
  border-bottom: 1px solid #f7f8f3;
  padding-bottom: 0.5em;
  color: #f7f8f3;
  padding: 1em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.notification-header span {
  font-size: 30px;
  margin-right: 0.5em;
}
.notification-body {
  padding: 1em 0;
  color: #f7f8f3;
  padding: 0.5em 1em;
}
.notification-body p{
  line-height: 30px;
}
.notification-progress-time {
  width: 100%;
  height: 7px;
  transition: all 0.2s;
  background: #2c3d63;
}

</style>
