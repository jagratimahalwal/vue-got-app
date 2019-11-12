import Vue from 'vue'
import VueRouter from 'vue-router'
import Characters from '../components/Characters'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Characters',
    component: Characters
  },
  {
    path: '/PageNotFound',
    name: 'PageNotFound',
    component: () => import( '../components/PageNotFound')
  }
]

const router = new VueRouter({
  routes
})

export default router
