import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path:'/home',
        name: 'home',
        component: () => import('../views/home')
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('../views/mall')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/User')
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('../views/other/other1.vue')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('../views/other/other2.vue')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
