import Vue from 'vue'
import VueRouter from 'vue-router'
import Faktur from '../views/Faktur.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Faktur',
    component: Faktur
  },
  {
    path: '/detail-pembayaran',
    name: 'Detail Pembayaran',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DetailPembayaran.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
