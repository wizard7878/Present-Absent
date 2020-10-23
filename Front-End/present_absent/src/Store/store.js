import Vue from 'vue'
import Vuex from 'vuex'
const { W } = window
Vue.use(Vuex)
export const store = new Vuex.Store({
    state:{
        title:'This is Title',
        userStatus : '', 
        image:'',
        username:'',
        userId : '',
        groupId : W.wapp.getWisId(),
        Host : 'localhost',
        Port : 3000
    }
})