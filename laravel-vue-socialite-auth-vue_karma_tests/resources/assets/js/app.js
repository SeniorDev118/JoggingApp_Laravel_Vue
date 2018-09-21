import Vue from 'vue'
import VueCookie from 'vue-cookie'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(
  Vuetify, {
    theme: {
      secondary: '#0e71a3',
      primary: '#52c2b8',
      accent: '#e95e29'
    }
  }
)

Vue.use(BootstrapVue);
Vue.use(VueCookie);

Vue.component('modal', {
  template: '#modal-template'
})

const app = new Vue({
    el: '#root',
    template: `<app></app>`,
    components: { App },
    router
});
