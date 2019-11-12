import Vue from 'vue'
import Vuex from 'vuex'
import GetAllCharacters from './Modules/GetAllCharacters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    GetAllCharacters
  }
})
