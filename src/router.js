import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import Dashboard from './views/Dashboard.vue'
import DataDashboard from './views/RegularData.vue'
import Token from './views/Token.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loginPage',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/dashboard2',
      name: 'dashboard-data',
      component: DataDashboard
    },
    {
      path: '/logout',
      names: 'logout',
      component: Logout
    }
  ]
})
