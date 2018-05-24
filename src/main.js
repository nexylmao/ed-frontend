import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import VBootstrap from 'bootstrap-vue'
import vicon from 'vue-icon'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.use(vicon);
Vue.use(VModal, {dialog: true, dynamic: true});
Vue.use(VBootstrap);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
