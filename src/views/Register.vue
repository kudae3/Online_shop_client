<template>
    <div class="mx-10 my-7 lg:my-5  flex justify-center items-center">
        
        <div class="sm:w-1/2 lg:w-[430px] bg-slate-100 rounded-lg shadow-md p-10 space-y-12 md:space-y-20">
            
            <h2 class="font-caveat font-bold text-2xl md:text-3xl text-center text-slate-500" >Welcome to Shauzk!</h2>
                        
            <form action="" class="space-y-7" @submit.prevent="register()">
                
                <div class="space-y-3">
                    <label class="font-medium text-slate-600 block" for="">Username</label>
                    <input v-model="inputData.name" class="duration-300 border-0 border-b-2 border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 focus:border-orange-400 w-full"  type="text" name="" id="" >
                </div>
                
                <div class="space-y-3">
                    <label class="font-medium text-slate-600 block" for="">Email</label>
                    <input v-model="inputData.email" class="duration-300 border-0 border-b-2 border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 focus:border-orange-400 w-full"  type="email" name="" id="" >
                </div>

                <div class="space-y-3">
                    <label class="font-medium text-slate-600 block" for="">Phone</label>
                    <input v-model="inputData.phone" class="duration-300 border-0 border-b-2 border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 focus:border-orange-400 w-full"  type="phone" name="" id="" >
                </div>  

                <div class="space-y-3">
                    <label class="font-medium text-slate-600 block" for="">Address</label>
                    <input v-model="inputData.address" class="duration-300 border-0 border-b-2 border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 focus:border-orange-400 w-full"  type="address" name="" id="" >
                </div>                              

                <div class="space-y-3">
                    <label class="font-medium text-slate-600 block" for="">Password</label>
                    <input v-model="inputData.password" class="duration-300 border-0 border-b-2 border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 focus:border-orange-400 w-full"  type="password" name="" id="" >
                </div>

                <div class="space-y-3">
                    <label class="font-medium text-slate-600 block" for="">Confirm Password</label>
                    <input v-model="inputData.confirmPassword" class="duration-300 border-0 border-b-2 border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 focus:border-orange-400 w-full"  type="password" name="" id="" >
                </div>

                <button class="px-3 py-2 text-slate-50 font-semibold bg-orange-400 rounded-md hover:scale-x-110 hover:bg-orange-500 duration-700">Signup</button>
            
                <p class="text-red-500 text-sm font-semibold">{{ errorMsg }}</p>
            
            </form>

            <p class="font-medium text-slate-500 text-sm">Already have an account?
                <router-link class="hover:text-orange-600 duration-300" :to="{name: 'login'}">
                    Login
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

        let router = useRouter();
        let errorMsg = ref('')
        let inputData = reactive({
            name: '',
            email: '',
            phone: '',
            address: '',
            password: '',
            confirmPassword: ''
        })

        let register = () =>{
            
            axios.post('http://127.0.0.1:8000/api/register', inputData)
            
            .then(result => {

                localStorage.setItem('userToken', result.data.token);

                store.dispatch('setToken', result.data.token)
                store.dispatch('setUser', result.data.user)
                router.push({name: 'home'})
            
            })
            .catch(err => {
                errorMsg.value = err.response.data.message 
            })
        }        

        return { errorMsg, inputData ,register}
    }
}
</script>

<style lang="scss" scoped>

</style>