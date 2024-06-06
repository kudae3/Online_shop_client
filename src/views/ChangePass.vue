<template>
    <div>
        
        <Navigation></Navigation>

        <div class="m-10 flex justify-center items-center">
        
            <div class=" relative sm:w-1/2 lg:w-[400px] bg-slate-100 rounded-lg shadow-md space-y-5 md:space-y-10 py-7 my-16 dark:bg-slate-800">

                <div v-if="successMsg" class="absolute top-0 bg-green-500 w-full text-center shadow-lg rounded-t-lg">
                    <p class="py-1 font-semibold text-white">Successfully changed the password!</p>
                </div>
                
                <h2 class="font-comfortaa font-bold text-2xl md:text-3xl text-center text-slate-500 dark:text-slate-300 px-10 py-5" >Change Password</h2>
                
                <form  class="space-y-10 px-10 py-5" @submit.prevent="Save()">
                    
                    <div class="space-y-2">
                        <label class="font-medium text-slate-600 dark:text-slate-200 block" for="">Current password</label>
                        <input v-model="currentPass" class="duration-300 border-0 border-b-[1px] border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 dark:text-slate-200 focus:border-green-500 w-full"  type="password" name="" id="" >
                        <h2 v-if="currentPassError" class="text-xs font-semibold text-red-600 pt-3">Current password field is required!</h2>                        
                        <h2 v-if="wrongPassError" class="text-xs font-semibold text-red-600 pt-3">{{ wrongPassError }}</h2>  
                    </div>

                    <div class="space-y-2">
                        <label class="font-medium text-slate-600 dark:text-slate-200 block" for="">New password</label>
                        <input v-model="newPass" class="duration-300 border-0 border-b-[1px] border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 dark:text-slate-200 focus:border-green-500 w-full"  type="password" name="" id="" >
                        <h2 v-if="newPassError" class="text-xs font-semibold text-red-600 pt-3">New password field is required!</h2>                        
                        <h2 v-if="lengthError" class="text-xs font-semibold text-red-600 pt-3">New password must be at least five characters!</h2>                        
                    </div>

                    <div class="space-y-2">
                        <label class="font-medium text-slate-600 dark:text-slate-200 block" for="">Confirm new password</label>
                        <input v-model="confirmPass" class="duration-300 border-0 border-b-[1px] border-slate-300 bg-transparent outline-none focus:none appearance-none focus:ring-0 font-semibold text-slate-600 dark:text-slate-200 focus:border-green-500 w-full"  type="password" name="" id="" >
                        <h2 v-if="confirmPassError" class="text-xs font-semibold text-red-600 pt-3">Confirm password field is required!</h2>                        
                        <h2 v-if="sameError" class="text-xs font-semibold text-red-600 pt-3">New password and confirm password must be the same!</h2>                                                
                    </div>

                    <button :disabled="isSaving" class="flex justify-center items-center space-x-2 px-3 py-2 text-slate-50 w-full font-semibold bg-orange-400 rounded-md hover:bg-orange-500 duration-700">
                        
                        <div v-if="loading" role="status">
                            <svg aria-hidden="true" class="inline size-5 text-gray-200 animate-spin fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>
                        
                        <div>
                            <p>{{ saveText }}</p>
                        </div>
                    </button>

                </form>


            </div>
        
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import Navigation from '../components/Navigation.vue'
import useUser from '../composables/useUser'
import axios from 'axios'
export default {
  components: { Navigation },
    setup () {

        let {userData, getUserData} = useUser();

        onMounted(()=>{
            getUserData();
        })

        let currentPass = ref('');
        let newPass = ref('');
        let confirmPass = ref('');

        let currentPassError = ref(false);
        let newPassError = ref(false);
        let confirmPassError = ref(false);
        let sameError = ref(false)
        let lengthError = ref(false)
        let wrongPassError = ref('')

        let loading = ref(false);
        let saveText = ref('Save');
        let isSaving = ref(false);
        let successMsg = ref(false)

        let Save = () => {

            sameError.value = false
            lengthError.value = false
            wrongPassError.value = false
            successMsg.value = false

            currentPassError.value = !currentPass.value ? true : false
            newPassError.value = !newPass.value ? true : false
            confirmPassError.value = !confirmPass.value ? true : false

            if(currentPass.value && newPass.value && confirmPass.value){
                
                if(newPass.value.length < 5){                    
                    lengthError.value = true 
                    currentPass.value = '',
                    newPass.value = '',
                    confirmPass.value = ''               
                }
                else if(newPass.value !== confirmPass.value){
                    sameError.value = true
                }
                else{

                    loading.value = true
                    saveText.value = 'Saving',
                    isSaving.value = true

                    axios.post('http://127.0.0.1:8000/api/change/password', {
                        user_id: userData.id,
                        currentPass: currentPass.value,
                        newPass: newPass.value
                    })
                    .then(res => {
                        
                        successMsg.value = true
                        
                        currentPass.value = '',
                        newPass.value = '',
                        confirmPass.value = ''

                        loading.value = false
                        saveText.value = 'Save',
                        isSaving.value = false
                        successMsg.value = true
                    })
                    .catch(err => {

                        wrongPassError.value = err.response.data.message

                        currentPass.value = '',
                        newPass.value = '',
                        confirmPass.value = ''
                        
                        loading.value = false
                        saveText.value = 'Save',
                        isSaving.value = false

                    })

                }
                
            }   

        }
        

        return { currentPass, newPass, confirmPass, 
                currentPassError, newPassError, confirmPassError, sameError, lengthError, wrongPassError,
                loading, saveText, isSaving, Save, userData, successMsg}
    }
}
</script>
