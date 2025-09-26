import {createRouter, createWebHistory } from 'vue-router';
import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'
import Home from './pages/Home.vue';
import store from './store/store';

const routes = [
    {path: '/', component: Home, meta: {requireAuth: true}},
    {path: '/home', component: Home, meta: {requireAuth: true}},
    {path: '/login', component: Login},
    {path: '/signup', component: Signup}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['auth/isAuthenticated']
    
    if(to.meta.requireAuth && !isAuthenticated){
        next('/login')
    }else if((to.path === '/login' && to.path === '/signup') && isAuthenticated){
        next('/home')
    }else{
        next()
    }
})

export default router;