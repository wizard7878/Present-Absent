<template>
  <div class="container">
    <section class="mt-5" v-if="show">
        <div class="d-flex">
        <h4 class="text-right ml-2">  تاریخ لیست  </h4> <h4 class="text-right"> {{date.split('').map(x => x === '-' ? '/' : x).join('')}} </h4>
        </div>
      <h5 class="text-right mt-5">دانشجویان حاظر</h5>
      <table
        class="table table-hover bg-light border border-success text-right"
      >
        <thead>
          <tr>
            <th scope="col">نام</th>
            <th scope="col">تاریخ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(present,i) in allmembers[1]" :key="i">
            <th scope="row">
              <img
                width="40"
                height="40"
                :src="present.image.split('').map(x=> x === '*' ? x = '/' : x).join('')"
                alt="عکس کاربر"
                style="border-radius: 50%;"
              /><span class="mr-2">{{present.name}}</span>
            </th>
            <td>{{present.present_date.split('--')[0].split('').map(x => x === '-' ? '/' : x).join('')}} {{present.present_date.split('--')[1]}}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="mt-5" v-if="show">
      <h5 class="text-right">دانشجویان غایب</h5>
      <table class="table table-hover bg-light border border-danger text-right">
        <thead>
          <tr>
            <th scope="col">نام</th>
            <th scope="col">تاریخ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(absent,i) in allmembers[0]" :key="i">
            <th scope="row">
              <img
                width="40"
                height="40"
                :src="absent.image.split('').map(x=> x === '*' ? x = '/' : x).join('')"
                alt="عکس کاربر"
                style="border-radius: 50%;"
              /><span class="mr-2">{{absent.name}}</span>
            </th>
            <td>{{absent.present_date}}</td>
          </tr>

        </tbody>
      </table>
    </section>
    <div class="d-flex justify-content-center align-items-center mt-5" v-if="show == false">
        <img width="100" height="100" src="img/Rolling-1s-200px.gif">
  </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props:{
        date:String
    },
    data(){
        return{
            show:false,
            allmembers : [[],[]],
            
        }
    },
    methods:{
        async getAllUsers(){
           let users = await axios.get(`http://${this.$store.state.Host}:${this.$store.state.Port}/users/history/${this.date}/${this.$store.state.groupId}`)
           this.show = true
            users.data[0].users.forEach(el =>{
              if(el.present_status){
                this.allmembers[1].push(el)
              } else {
                this.allmembers[0].push(el)
              }
            })
        }
    },

  
    
    created(){
       this.getAllUsers()
        
    },
   
};
</script>

<style scoped></style>
