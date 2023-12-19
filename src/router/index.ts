import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/',
    name: 'index',
    component: () => import('../App.vue')
  },
  {
    path:'/home',
    name:'home',
    component:()=> import("../views/Home.vue"),
    children:[
      {
        path:'new1',
        name:'new1',
        component:()=> import("../views/Nex1.vue")
      },
      {
        path:'new2',
        name:'new2',
        component:()=> import("../views/Nex2.vue")
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
