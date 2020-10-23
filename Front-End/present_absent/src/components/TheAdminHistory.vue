<template>
    <div class="container">
        <section class="mt-5">
            
            <div @click="seehistorydate(date)" style="cursor:pointer" class="media bg-light mt-2 border" v-for="(date,i) in dates" :key="i">
                <img class="mt-2 mb-2" style="border-radius: 60%;" src="img/calender.png" width="70" height="70">
                <div class="media-body text-right d-flex mt-4 mr-2 flex-column">
                    <span class="mt-2">
                        {{date.split('').map(x => x === '-' ? '/' : x).join('')}}
                    </span>
                </div>
            </div>
                
            <component :is='selectedComponent' v-if="showCompo" :date='historySelectedDate'></component>
    </section>

    </div>
</template>


<script>
import axios from 'axios'
import adminMainHistory from './TheAdminMainHistory'
export default {
    components:{
        'app-admin-main-history':adminMainHistory
    },
    data(){
        return{
            dates : [],
            group_id:'myWisId',
            showCompo : false,
            historySelectedDate:'',
            selectedComponent: ''
        }
    },
    methods:{
        async historydates(){
            let dates = await axios(`http://${this.$store.state.Host}:${this.$store.state.Port}/users/history/dates/${this.$store.state.groupId}`)
            this.dates = dates.data
        },
        seehistorydate(date){
            this.showCompo = false
            this.historySelectedDate = date
            this.selectedComponent = ''
           this.showCompo = true
            
        },
       
    },

    created(){
        this.historydates()
    },

    updated(){
        this.selectedComponent = 'app-admin-main-history'
    }
 
}
</script>



<style scoped>

</style>