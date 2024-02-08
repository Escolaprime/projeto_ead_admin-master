import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth/auth';
import helpers from './modules/helpers/helper'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    helpers
  }
})
