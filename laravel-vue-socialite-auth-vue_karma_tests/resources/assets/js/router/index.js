import Vue from 'vue'
import VueRouter from 'vue-router'

import Register from '../views/Auth/Register.vue'
import Login from '../views/Auth/Login.vue'
import UploadImage from '../views/UploadImage.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    routes:[
        {path: '/UploadImage', component: UploadImage},
        {path: '/register', component: Register},
        {path: '/login', component: Login}
    ]
});

export default router