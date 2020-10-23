<template>
  <div class="container">
    <section class="mt-5">
      <h5 class="text-right">دانشجویان حاظر</h5>
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
                :src="present.image.split('').map(x => x === '*' ? x = '/' : x).join('')"
                alt="عکس کاربر"
                style="border-radius: 50%;"
              /><span class="mr-2">{{present.name}}</span>
            </th>
            <td> {{present.present_date.split('--')[0].split('').map(x => x === '-' ? '/' : x).join('')}} {{present.present_date.split('--')[1]}} </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="mt-5">
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

  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            allmembers : [[],[]],
        }
    },
    methods:{
        async getAllUsers(){
           let users = await axios.get(`http://${this.$store.state.Host}:${this.$store.state.Port}/users/admin/members/${this.$store.state.groupId}`)
            users.data.forEach(el =>{
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
    }
};
</script>

<style scoped></style>
