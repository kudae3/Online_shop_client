import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'

const routes = [
    {path: '/', alias: '/login', name: 'login', component: Login},
    {path: '/register', name: 'register', component: Register},
    {path: '/home', name: 'home', component: Home}
]

const router = createRouter({
    routes, 
    history: createWebHistory(),
})

export default router;