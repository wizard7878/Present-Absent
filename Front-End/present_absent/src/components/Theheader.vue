<template>
  <div>
    <div class="bg-info w-100">
      <div class="media align-items-center mr-5" style="height: 7em;">
        <img width="80" height="80" class="bg-dark ml-3" :src="this.$store.state.image" alt="عکس کاربر" />
        <div class="media-body text-right">
          <h4 class="mt-4 mb-1 text-white">روز بخیر {{name}}</h4>
          <span class="text-white">تاریخ امروز: {{dateToday}}</span>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="d-flex justify-content-center mt-3">
        <section class="pref-container">
          <section class="preference">
            <div>
              <slot name="switch-btn"></slot>
            </div>
          </section>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import m from 'jalali-moment'
export default {
  data(){
    return{
      name : '',
      image:this.$store.state.image,
      dateToday : ''
    }
  },

  methods:{
    async getName(){
      let data = await axios.get(`http://${this.$store.state.Host}:${this.$store.state.Port}/users/student/info/${this.$store.state.userId}/${this.$store.state.groupId}`)
      this.name = data.data[0][0].name
    },
    todayDate(){
      m.locale('fa')
      let enDate = new Date()
      let persianDate = m.from(`${enDate.getFullYear()}-${enDate.getMonth() + 1}-${enDate.getDate()}`, 'en', 'YYYY-MM-DD').format()
      let date = persianDate.slice(0,10)
      date = date.split('').map(x => x === '-' ? x = '/' : x).join('')
      this.dateToday = date
    }
  },
  created(){
    this.getName()
    this.todayDate()
  }

};
</script>

<style scoped>
    img {
    border-radius: 50%;
    }

    header {
    margin-bottom: 2em;
    }
    h1,
    h2,
    h3 {
    margin: 0;
    color: #555;
    text-rendering: optimizeLegibility;
    }
    h1 {
    font-size: 2.25em;
    margin: 0;
    font-weight: normal;
    font-weight: 200;
    }
    h2 {
    font-size: 1em;
    text-transform: uppercase;
    font-weight: normal;
    }

    h4{
      font-size: 17px;
    }
    input[type="checkbox"] {
    display: none;
    }
    .toggle-button {
    cursor: pointer;
    background: #4db6ac;
    background: -moz-linear-gradient(top, #6c17cc, #8a23b9);
    background: -webkit-linear-gradient(top, #2715ce, #240577);
    background: linear-gradient(top, #2d0097, #0f0cc5);
    border-radius: 6px;
    border: 1px solid #555555;
    /* width: 110px; */
    width: 160px;
    position: relative;
    height: 44px;
    color: #fff;
    line-height: 42px;
    font-size: 18px;
    text-shadow: 0 -1px 1px #093b5c;
    }
    .toggle-button:before {
    content: "امروز";
    padding-left: 18px;
    }
    .toggle-button:after {
    content: "تاریخچه";
    padding-left: 14px;
    }

    .toggle-button .switch {
    display: block;
    width: 80px;
    height: 40px;
    border-radius: 5px;
    background: #d8f2f1;
    background: -moz-linear-gradient(top, #fefefe, #d8f2f1);
    background: -webkit-linear-gradient(top, #fefefe, #d8f2f1);
    background: linear-gradient(top, #fefefe, #d8f2f1);
    border: 1px solid #fff;
    position: absolute;
    top: 1px;
    left: 1px;
    }
    input[type="checkbox"]:checked + .toggle-button .switch {
    /* left: 63px; */
    left: 78px;
    }
    input[type="checkbox"]:not(:checked) + .toggle-button {
    background: -moz-linear-gradient(top, #737373, #aeaeae);
    background: -webkit-linear-gradient(top, #737373, #aeaeae);
    background: linear-gradient(top, #737373, #aeaeae);
    }
    input[type="checkbox"]:not(:checked) + .toggle-button .switch {
    background: -moz-linear-gradient(top, #ececec, #d9d9d9);
    background: -webkit-linear-gradient(top, #ececec, #d9d9d9);
    background: linear-gradient(top, #ececec, #d9d9d9);
    }
    input[type="checkbox"]:disabled + .toggle-button {
    opacity: 0.25;
    }
</style>
