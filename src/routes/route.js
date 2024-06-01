import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import Cart from '../views/Cart.vue'
import Order from '../views/Order.vue'
import AccCenter from '../views/AccCenter.vue'
import AccDetail from '../views/AccDetail.vue'
import AccEdit from '../views/AccEdit.vue'

const routes = [
    
    {
        path: '/',
        alias: '/login',
        name: 'login', 
        component: Login,
        beforeEnter: (to, from, next) => {
            let token = localStorage.getItem('userToken') 

            if(!token){
                next()
            }
            else{
                next({name: 'home'})
            }

        }
    },
       
    {
        path: '/register', 
        name: 'register', 
        component: Register,         
        beforeEnter: (to, from, next) => {
        
            let token = localStorage.getItem('userToken') 
            if(!token){
                next()
            }
            else{
                next({name: 'home'})
            }
        }
    },
    
    {
        path: '/home', 
        name: 'home', 
        component: Home,
        beforeEnter: (to, from, next) => {
            let token = localStorage.getItem('userToken') 
            if(token){
                next()
            }
            else{
                next({name: 'login'})
            }
        }
    },
    
    {
        path: '/home/detail/:id', 
        name: 'detail', 
        component: Detail, 
        props: true,
        beforeEnter: (to, from, next) => {
            let token = localStorage.getItem('userToken') 
            if(token){
                next()
            }
            else{
                next({name: 'login'})
            }
        }
    },
    
    {
        path: '/cart', 
        name: 'cart', 
        component: Cart,
        beforeEnter: (to, from, next) => {
            let token = localStorage.getItem('userToken') 
            if(token){
                next()
            }
            else{
                next({name: 'login'})
            }
        }
    },
    
    {
        path: '/order', 
        name: 'order', 
        component: Order,
        beforeEnter: (to, from, next) => {
            let token = localStorage.getItem('userToken') 
            if(token){
                next()
            }
            else{
                next({name: 'login'})
            }
        }
    }, 

    {
        path : '/account/center',
        name: 'accCenter',
        component: AccCenter,
        beforeEnter: (to, from, next) => {
            let token = localStorage.getItem('userToken') 
            if(token){
                next()
            }
            else{
                next({name: 'login'})
            }
        }
    },

    {
        path : '/account/detail',
        name: 'accDetail',
        component: AccDetail,
        beforeEnter: (to, from, next) => {
            let token = localStorage.getItem('userToken') 
            if(token){
                next()
            }
            else{
                next({name: 'login'})
            }
        }
    },

    {
        path : '/account/edit',
        name: 'accEdit',
        component: AccEdit,
        beforeEnter: (to, from, next) => {
            let token = localStorage.getItem('userToken') 
            if(token){
                next()
            }
            else{
                next({name: 'login'})
            }
        }
    }
]

const router = createRouter({
    routes, 
    history: createWebHistory(),
})

export default router;