/*!

=========================================================
* Vue Argon Dashboard - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-argon-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/vue-argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import ArgonDashboard from "./plugins/argon-dashboard";
import "element-plus/lib/theme-chalk/index.css";
import Axios from "axios";
import devtools from '@vue/devtools';
import Can from '@/mixins/can';

Axios.defaults.headers["Accept"] = "Application/json";
Axios.defaults.baseURL = process.env.VUE_APP_API_URL;

if (localStorage.getItem("token")) {
    Axios.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
}

if (process.env.NODE_ENV === 'development') {
    devtools.connect('localhost', 8098)
}

const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(Can);
appInstance.use(store);
appInstance.config.devtools = true;
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
