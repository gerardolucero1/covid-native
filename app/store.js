import Vue from 'vue';
import Vuex from 'vuex';

import Home from './components/pages/Home.vue'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
	  	user: null,
		token: null,
		state: null,
		city: null,  
	},

  	mutations: {
  		updateUser(state, payload){
  			state.user = payload
  		},

		updateToken(state, payload){
			state.token = payload
		},

		updateState(state, payload){
			state.state = payload
		},

		updateCity(state, payload){
			state.city = payload
		},

		updateStatusUser(state, payload){
			state.user.infection = false
		}
	},

  	actions: {
		
  	}
});

