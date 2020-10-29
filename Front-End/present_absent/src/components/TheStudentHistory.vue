<template>
    <div class="container">
        <section class="mt-5" dir="rtl">
            <div class="media bg-light mt-2 border" v-for="(stdHistory,i) in studentHistory" :key="i">
               
                <img class="mt-2 mr-2 mb-2" style="border-radius: 50%;" v-if="!stdHistory.present_status" src="img/absent-icon.png" width="55" height="55">
                <img class="mt-2 " style="border-radius: 50%;" v-if="stdHistory.present_status" src="img/present-icon.png" width="70" height="60">
                <div class="media-body text-right d-flex mt-4 mr-2 flex-column">
                    <span v-if="stdHistory.present_status">
                        {{stdHistory.present_date.split('--')[1]}}
                    </span>
                    <p>
                      {{stdHistory.present_date.split('--')[0].split('').map(x => x == '-' ? x = '/' : x).join('')}}
                       
                    </p>
                </div>
            </div>
    </section>
    </div>
</template>


<script>
import axios from 'axios'
export default {
  
    data(){
        return{
                studentHistory : []
            }
    },
    methods:{
        async getStudentHistory(){
            let dates = await axios.get(`https://${this.$store.state.Host}/users/student/info/${this.$store.state.userId}/${this.$store.state.groupId}`)
            this.studentHistory = dates.data[0].reverse()
            console.log('His',dates.data)
        },
    },
    created(){
        
        this.getStudentHistory()
        
    },

 
}
</script>



<style scoped>

</style>