import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import sampleQueries from "./lib/search-samples.json";

Vue.use(BootstrapVue);


Vue.config.productionTip = false

Vue.prototype.$sampleQueries = sampleQueries;
Vue.prototype.$apiServers = {
  "movies" : process.env.VUE_APP_MOVIES_SERVICE||"http://localhost:3000/api",
  "comments" : process.env.VUE_APP_COMMENTS_SERVICE||"http://localhost:8000"
};

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
