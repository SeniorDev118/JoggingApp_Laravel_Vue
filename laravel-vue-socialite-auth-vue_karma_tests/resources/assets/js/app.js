import Vue from 'vue'
import VueCookie from 'vue-cookie'

import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(
  Vuetify, {
    theme: {
      secondary: '#0e71a3',
      primary: '#52c2b8',
      accent: '#e95e29'
    }
  }
)

Vue.use(VueCookie);

const app = new Vue({
    el: '#root',
    template: `<app></app>`,
    components: { App },
    router
});
