<template>
    <div>

        <Navigation></Navigation>
    
        <div v-if="userData.photo" class="mx-10 my-7 lg:my-5 flex flex-col justify-center items-center space-y-10">
            
            <h1 class=" text-slate-400 font-bold text-2xl font-comfortaa">Edit Account Details</h1>

            <div class="space-y-12">

                <!-- Image -->
                <div class="size-52 lg:size-60 mx-auto">
                    <img class="rounded-full shadow-sm" :src="userData.photo" alt="">                    
                </div>

                <!-- DropZone -->
                <div class="space-y-3">
        
                    <h2 class="font-medium text-slate-700 dark:text-slate-300">Update Profile picture</h2>
                    
                    <div @dragover.prevent="dragOver" @drop.prevent="drop" class="flex items-center justify-center w-full">
                        <label for="dropzoneFile" class="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-200 dark:border-slate-600 border-solid rounded-lg cursor-pointer bg-gray-50 dark:bg-slate-800 dark:hover:bg-slate-700 hover:bg-gray-100">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzoneFile" type="file" class="hidden" @change="selectedFile" ref="fileInput"/>
                        </label>      
                    </div>

                    <h2 v-if="dropzoneFile" class="text-green-600 text-sm font-semibold">File : {{ dropzoneFile.name }}</h2>

                </div>

                <!-- Detail text -->
                <div class="space-y-10">
                    
                    <div class=" font-medium text-slate-700 dark:text-slate-200">
                        Username - 
                        <input v-model="updateUserData.name" class="bg-transparent outline-none ms-3 focus:none appearance-none focus:ring-0 border-0 border-b-[1px] focus:border-green-400 duration-300 py-0" type="text">
                        <h2 v-if="nameError" class="text-xs font-semibold text-red-600 pt-3">Username is required!</h2>
                    </div>

                    <div class=" font-medium text-slate-700 dark:text-slate-200">
                        Email - 
                        <input v-model="updateUserData.email"  class="bg-transparent outline-none ms-3 focus:none appearance-none focus:ring-0 border-0 border-b-[1px] focus:border-green-400 duration-300 py-0" type="email">
                        <h2 v-if="emailError" class="text-xs font-semibold text-red-600 pt-3">Email is required!</h2>
                    </div>

                    <div class=" font-medium text-slate-700 dark:text-slate-200">
                        Phone - 
                        <input v-model="updateUserData.phone" class="bg-transparent outline-none ms-3 focus:none appearance-none focus:ring-0 border-0 border-b-[1px] focus:border-green-400 duration-300 py-0" type="text">
                        <h2 v-if="phoneError" class="text-xs font-semibold text-red-600 pt-3">Phone is required!</h2>
                    </div>

                    <div class=" font-medium text-slate-700 dark:text-slate-200">
                        Gender -                         
                        <input v-model="updateUserData.gender" class="bg-transparent outline-none ms-3 focus:none appearance-none focus:ring-0 border-0 border-b-[1px] focus:border-green-400 duration-300 py-0" type="text">
                    </div>

                    <div class=" font-medium text-slate-700 dark:text-slate-200">
                        Address - 
                        <input v-model="updateUserData.address" class="bg-transparent outline-none ms-3 focus:none appearance-none focus:ring-0 border-0 border-b-[1px] focus:border-green-400 duration-300 py-0" type="text">
                    </div>

                </div>

                <button :disabled="isSaving" @click="SaveEdit()" class="flex items-center justify-center space-x-2 float-end rounded-xl text-base font-semibold bg-green-600 px-4 py-2 text-slate-50 hover:bg-green-700 duration-300">
                
                    <div v-if="loading" role="status">
                            <svg aria-hidden="true" class="inline size-6 text-gray-200 animate-spin fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>
                        
                        <div>
                            <p>{{ saveText }}</p>
                        </div>
                
                </button>

            </div>
        
        </div>

        <div v-else>
            <Spinner></Spinner>
        </div>

    </div>
</template>

<script>

import axios from 'axios'
import Navigation from '../components/Navigation.vue'
import Spinner from '../components/Spinner.vue'
import useUser from '../composables/useUser.js'
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
export default {
  components: {
     Navigation, Spinner },
    
    setup () {

        let {userData, getUserData} = useUser();
        const dropzoneFile = ref(null);
        const fileInput = ref(null);
        let router = useRouter()
        let loading = ref(false)
        let saveText = ref('Save Changes')
        let isSaving = ref(false)

        let nameError = ref(false)
        let emailError = ref(false)
        let phoneError = ref(false)

        onMounted(()=>{
            getUserData();
        })

        let updateUserData = reactive({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            gender: userData.gender,
            address: userData.address
        })
    
        const drop = (e) => {
            dropzoneFile.value = e.dataTransfer.files[0];
        };
    
        const selectedFile = () => {
            dropzoneFile.value = fileInput.value.files[0];
        };
    
        const dragOver = (e) => {
            e.preventDefault();
        }

        
        let SaveEdit = () => {  

            loading.value = true
            saveText.value = 'Saving'
            isSaving.value = true
            
            nameError.value = !updateUserData.name ? true : false;
            emailError.value = !updateUserData.email ? true : false;
            phoneError.value = !updateUserData.phone ? true : false;

            if(updateUserData.name && updateUserData.email && updateUserData.phone){

                let formData = new FormData();
                
                formData.append('user_id', userData.id);
                formData.append('name', updateUserData.name);
                formData.append('email', updateUserData.email);
                formData.append('phone', updateUserData.phone);
                formData.append('gender', updateUserData.gender);
                formData.append('address', updateUserData.address);
                
                if (dropzoneFile.value) {
                    formData.append('image', dropzoneFile.value);
                }

                axios.post('http://127.0.0.1:8000/api/account/edit', formData , {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(res => {
                    loading.value = false
                    saveText.value = 'Save Changes'
                    isSaving.value = false
                    router.push({name: 'accDetail'})
                })
                .catch(err => {
                    console.error(err); 
                });

            }
        
        }

    
        return {userData, updateUserData, SaveEdit, 
                dropzoneFile, drop, selectedFile, fileInput, dragOver,
                nameError, emailError, phoneError, loading, saveText, isSaving };

    }
}
</script>
