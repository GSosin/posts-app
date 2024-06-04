import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import RegisterPage from '../pages/RegisterPage.vue'

const routes = [
    {
        path: '/',
        name: 'Register / Home',
        component: () => {
            if(localStorage.getItem('user')) {

                return import('../pages/HomePage.vue')
            } else {
                return import('../pages/LoginPage.vue')
            }

        }
    
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/LoginPage.vue')
    },
    {
        path: '/register',
        name: 'Create User',
        component: RegisterPage
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../pages/ProfilePage.vue')
    },
    {
        path: '/tweet/:id?',
        name: 'Tweet',
        component: () => import('../pages/TweetPage.vue'),
        props: true,
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'NotFound',
    //     component: () => import('../pages/NotFoundPage.vue')
    // },
]

const router = createRouter({
  history: createWebHistory(),
  extendRoutes: setupLayouts,
  routes,
})

export default router
