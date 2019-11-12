import axios from 'axios'
import Vue from 'vue'


const state = {
  allCharacters: [],
  page:1,
  charAge: [],
  allCharactersWithAge: [],
  characterDetails:{},
  showSideScreen: false,
  isLoading: true,
  isError: false
}

const getters = {
  allCharDetails: (state) => state.allCharactersWithAge,
  characterDetail: (state) => state.characterDetails,
  showSideScreen: (state) => state.showSideScreen,
  isLoading: (state) => state.isLoading,
  isError: (state) => state.isError,
}

const actions = {
  async fetchAllChars({ commit , dispatch }) {
    let pageNum = parseInt(state.page)+2
    if(!state.allCharacters[state.page]){ //if the data for page number is already there then do not call the API
        const response = await axios.get(
          `https://www.anapioficeandfire.com/api/characters?page=${pageNum}&pageSize=10`
        );
        if(response.status == 200 ){
            commit('SET_CHARACTERS', response.data)
            dispatch('fetchAgeOfCharc')
        }else {
          let error = true
          commit('SET_ERROR', error)
          commit('IS_LOADING')
        } 
        
      }else {
        commit('IS_LOADING')
      }
  },
  updatePageNum ({commit}, page) { 
    commit('UPDATE_PAGENUM', page)
  },
  async fetchAgeOfCharc({commit , dispatch}){
    let nameParam = '?name='
    state.allCharacters[state.page].map((item) => nameParam += '&name='+item.name.split(' ').slice(0,1).join(' ') )
    const ageResponse = await axios.get(
      `https://api.agify.io/`+nameParam
    );
    if(ageResponse.status){
      commit('SET_CHARACTERS_AGE',ageResponse.data)
      dispatch('getWholeData')
    }else {
      let error = true
      commit('SET_ERROR', error)
    } 
    
  },
  getWholeData({commit}){
    state.allCharacters[state.page].map((item,index) => {
      if(item.name.split(' ').slice(0,1).join(' ') === state.charAge[state.page][index].name){
        item.age = state.charAge[state.page][index].age
      }else {
        item.age = (Math.floor(Math.random() * 30) + 50)
      }      

    })
    commit('SET_WHOLE_DATA',state.allCharacters[state.page])
    commit('IS_LOADING')
  },
  fetchDetails({commit} , id){
    let characterDetails = state.allCharacters[state.page][id]
    commit('CHARACTER_DETAIL', characterDetails)
    let showBar = true
    commit('SHOW_SIDEBAR',showBar)
  },
  toggleSideBar({commit}) {
    let showBar = false
    commit('SHOW_SIDEBAR',showBar)
  },
  toggleIsLoading({commit}) {
    commit('IS_LOADING')
  } 

}


const mutations = {
  SET_CHARACTERS: (state, allCharacters) => {
    Vue.set(state.allCharacters , state.page , allCharacters)
  },

  UPDATE_PAGENUM: (state, page) => {
    state.page = page
  },

  SET_CHARACTERS_AGE: (state, allAge) => {
    Vue.set(state.charAge , state.page, allAge)
  }, 

  SET_WHOLE_DATA: (state, wholeCharc) => {
    Vue.set(state.allCharactersWithAge , state.page, wholeCharc)
  },

  CHARACTER_DETAIL: (state, characterDetails) => {
    state.characterDetails = characterDetails
  },

  SHOW_SIDEBAR: (state, showBar) => {
    state.showSideScreen = showBar
  },

  IS_LOADING: (state) => {
    state.isLoading = !state.isLoading
  },

  SET_ERROR: (state, error) => {
    state.isError = error
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}