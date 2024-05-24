<template>
    <div class="m-10 flex justify-center items-center">
        
        <div class=" sm:w-1/2 lg:w-[400px] bg-slate-100 rounded-lg shadow-md p-10 space-y-12 md:space-y-20">
            
            <h2 class="font-caveat font-bold text-2xl md:text-3xl text-center text-slate-500" >Login to Shauzk!</h2>
            
            <form  class="space-y-7" @submit.prevent="Login()">
                
                <div class="space-y-3">
                    <label class="font-medium text-slate-600 block" for="">Email</label>
                    <input v-model="inputData.email" class="duration-300 border-0 border-b-2 border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 focus:border-orange-400 w-full"  type="email" name="" id="" >
                </div>

                <div class="space-y-3">
                    <label class="font-medium text-slate-600 block" for="">Password</label>
                    <input v-model="inputData.password" class="duration-300 border-0 border-b-2 border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 focus:border-orange-400 w-full"  type="password" name="" id="" >
                </div>

                <button class="px-3 py-2 text-slate-50 font-semibold bg-orange-400 rounded-md hover:scale-x-110 hover:bg-orange-500 duration-700">Login</button>

                <p class="text-red-500 text-sm font-semibold">{{ errorMsg }}</p>

            </form>

            <p class="font-medium text-slate-500 text-sm">New user?
                <router-link class="hover:text-orange-600 duration-300" :to="{name: 'register'}">
                    Register an account
                </router-link>
            </p>

        </div>
    
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import store from '../store';

export default {
    setup () {
        
        let errorMsg = ref('');
        let router = useRouter();
        
        let inputData = reactive({
            email : '',
            password: ''
        })

        let Login = () => {
            
            axios.post('http://127.0.0.1:8000/api/login', inputData)
            
            .then((result) => {
               
                localStorage.setItem('userToken', result.data.token);
                
                store.dispatch('setToken', result.data.token);
                store.dispatch('setUser', result.data.user)
                router.push({name: 'home'})

            }).catch((err) => {
                
                errorMsg.value = err.response.data.message
                inputData.email = null,
                inputData.password = null

            });
        }

        return {inputData, errorMsg, Login}
    }
}
</script>
