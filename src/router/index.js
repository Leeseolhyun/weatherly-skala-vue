import { createRouter, createWebHistory } from 'vue-router'
import CityExplorerView from '../views/CityExplorerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TravelHome',
      component: CityExplorerView,
    },
    {
      path: '/about',
      name: 'WeatherAbout',
      component: () => import('../views/WeatherAboutView.vue'),
    },
    {
      path: '/weather/:cityId',
      name: 'WeatherDetail',
      component: () => import('../views/WeatherDetailView.vue'),
    },
    {
      path: '/tips',
      name: 'WeatherTips',
      component: () => import('../views/WeatherTipsView.vue'),
    },
    {
      path: '/recommend',
      name: 'WeatherRecommend',
      component: () => import('../views/WeatherRecommendView.vue'),
    },
    {
      path: '/assignment',
      name: 'WeatherAssignment',
      component: () => import('../views/WeatherAssignmentView.vue'),
    },
    {
      path: '/cities',
      redirect: '/',
    },
    {
      path: '/weather',
      name: 'AxiosJson',
      component: () => import('../views/AxiosJsonView.vue'),
    },
    {
      path: '/element-plus',
      name: 'ElementPlus',
      component: () => import('../views/ElementPlusView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
