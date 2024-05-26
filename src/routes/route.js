import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import Cart from '../views/Cart.vue'

const routes = [
    {path: '/', alias: '/login', name: 'login', component: Login},
    {path: '/register', name: 'register', component: Register},
    {path: '/home', name: 'home', component: Home},
    {path: '/home/detail/:id', name: 'detail', component: Detail, props: true},
    {path: '/cart', name: 'cart', component: Cart}
]

const router = createRouter({
    routes, 
    history: createWebHistory(),
})

export default router;