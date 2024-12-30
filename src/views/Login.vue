<template>
    <div class="m-10 flex justify-center items-center">
        
        <div class=" sm:w-1/2 lg:w-[400px] bg-slate-100 rounded-lg shadow-md p-10 space-y-12 md:space-y-20 dark:bg-slate-800">
            
            <h2 class="font-caveat font-bold text-2xl md:text-3xl text-center text-slate-500 dark:text-slate-300" >Login to Shauzk!</h2>
            
            <form  class="space-y-7" @submit.prevent="Login()">
                
                <div class="space-y-3">
                    <label class="font-medium text-slate-600 dark:text-slate-200 block" for="">Email</label>
                    <input v-model="inputData.email" class="duration-300 border-0 border-b-[1px] border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 dark:text-slate-200 focus:border-green-500 w-full"  type="email">
                    <h2 v-if="emailError" class="text-xs font-semibold text-red-600 pt-3">Email is required!</h2>                    
                </div>

                <div class="space-y-3">
                    <label class="font-medium text-slate-600 dark:text-slate-200 block" for="">Password</label>
                    <input v-model="inputData.password" class="duration-300 border-0 border-b-[1px] border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 dark:text-slate-200 focus:border-green-500 w-full"  type="password">
                    <h2 v-if="passError" class="text-xs font-semibold text-red-600 pt-3">Password is required!</h2>
                    <h2 v-if="lengthError" class="text-xs font-semibold text-red-600 pt-3">Password must be at least six characters!</h2>                                                                            
                </div>

                <h2 v-if="serverError" class="text-xs font-semibold text-red-600 pt-3">{{ serverError }}</h2>

                <button :disabled="isLogging" class="flex justify-center items-center space-x-2 px-3 py-2 text-slate-50 font-semibold bg-orange-400 rounded-md hover:bg-orange-500 duration-700">
                
                        <div v-if="loading" role="status">
                            <svg aria-hidden="true" class="inline size-5 text-gray-200 animate-spin fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>
                        
                        <div>
                            <p class="text-sm">{{ loginText }}</p>
                        </div>
                
                </button>

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

export default {
    setup () {

        let loading = ref(false)
        let loginText = ref('Login')
        let isLogging = ref(false)

        let emailError = ref(false)
        let passError = ref(false)
        let lengthError = ref(false)
        let serverError = ref('');
        let router = useRouter();
        
        let inputData = reactive({
            email : '',
            password: ''
        })

        let Login = () => {
            
            emailError.value = false,
            passError.value = false,
            lengthError.value = false 
            serverError.value = ""         

            emailError.value = !inputData.email ? true : false,
            passError.value = !inputData.password ? true : false
            
            if(inputData.email && inputData.password){

                if(inputData.password.length < 6){
                    lengthError.value = true
                }
                else{

                    loading.value = true,
                    loginText.value = 'Logging in',
                    isLogging.value = true

                    emailError.value = false,
                    passError.value = false,
                    lengthError.value = false

                    axios.post('http://127.0.0.1:8000/api/login', inputData)
            
                    .then((result) => {
                    
                        localStorage.setItem('userToken', result.data.token);
                        router.push({name: 'home'})                     

                    }).catch((err) => {

                        console.log(err);
                        serverError.value = err.response.data.message
                        
                        loading.value = false,
                        loginText.value = 'Login',
                        isLogging.value = false
                        
                        inputData.email = null,
                        inputData.password = null

                    });
                }
            
            }   
   
        }

        return {inputData, Login, loading, loginText, isLogging, serverError,
                emailError, passError, lengthError}
    }
}
</script>
