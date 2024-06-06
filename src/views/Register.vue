<template>
    <div class="mx-10 my-7 lg:my-5  flex justify-center items-center">
        
        <div class="sm:w-1/2 lg:w-[430px] bg-slate-100 dark:bg-slate-800 rounded-lg shadow-md p-10 space-y-12 md:space-y-20">
            
            <h2 class="font-caveat font-bold text-2xl md:text-3xl text-center text-slate-500 dark:text-slate-300" >Welcome to Shauzk!</h2>
                        
            <form action="" class="space-y-7" @submit.prevent="register()">
                
                <div class="space-y-3">
                    <label class="font-medium text-slate-600 dark:text-slate-200 block" for="">Username</label>
                    <input v-model="inputData.name" class="duration-300 border-0 border-b-[1px] border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 dark:text-slate-200 focus:border-green-500 w-full"  type="text" name="" id="" >
                </div>
                
                <div class="space-y-3">
                    <label class="font-medium text-slate-600 dark:text-slate-200 block" for="">Email</label>
                    <input v-model="inputData.email" class="duration-300 border-0 border-b-[1px] border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 dark:text-slate-200 focus:border-green-500 w-full"  type="email" name="" id="" >
                </div>

                <div class="space-y-3">
                    <label class="font-medium text-slate-600 dark:text-slate-200 block" for="">Phone</label>
                    <input v-model="inputData.phone" class="duration-300 border-0 border-b-[1px] border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 dark:text-slate-200 focus:border-green-500 w-full"  type="phone" name="" id="" >
                </div>  

                <div class="space-y-3">
                    <label class="font-medium text-slate-600 dark:text-slate-200 block" for="">Address</label>
                    <input v-model="inputData.address" class="duration-300 border-0 border-b-[1px] border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 dark:text-slate-200 focus:border-green-500 w-full"  type="address" name="" id="" >
                </div>                              

                <div class="space-y-3">
                    <label class="font-medium text-slate-600 dark:text-slate-200 block" for="">Password</label>
                    <input v-model="inputData.password" class="duration-300 border-0 border-b-[1px] border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 dark:text-slate-200 focus:border-green-500 w-full"  type="password" name="" id="" >
                </div>

                <div class="space-y-3">
                    <label class="font-medium text-slate-600 dark:text-slate-200 block" for="">Confirm Password</label>
                    <input v-model="inputData.confirmPassword" class="duration-300 border-0 border-b-[1px] border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 dark:text-slate-200 focus:border-green-500 w-full"  type="password" name="" id="" >
                </div>

                <button :disabled="isSigningup" class=" flex justify-center items-center space-x-2 px-3 py-2 text-slate-50 font-semibold bg-orange-400 rounded-md hover:bg-orange-500 duration-700">
                
                    <div v-if="loading" role="status">
                            <svg aria-hidden="true" class="inline size-5 text-gray-200 animate-spin fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>
                        
                        <div>
                            <p class="text-sm">{{ signupText }}</p>
                        </div>                
                
                </button>
            
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

export default {
    setup () {

        let router = useRouter();
        let errorMsg = ref('')
        
        let loading = ref(false)
        let signupText = ref('Sign Up')
        let isSigningup = ref(false)
        
        let inputData = reactive({
            name: '',
            email: '',
            phone: '',
            address: '',
            password: '',
            confirmPassword: ''
        })

        let register = () =>{

            loading.value = true
            signupText.value = 'Signing Up',
            isSigningup.value = true
            
            axios.post('http://127.0.0.1:8000/api/register', inputData)
            
            .then(result => {

                localStorage.setItem('userToken', result.data.token);
                router.push({name: 'home'})
            
            })
            .catch(err => {
                
                errorMsg.value = err.response.data.message 

                loading.value = false
                signupText.value = 'Sign Up',
                isSigningup.value = false
            
            });
        }        

        return { errorMsg, inputData ,register, loading, signupText, isSigningup}
    }
}
</script>

<style lang="scss" scoped>

</style>