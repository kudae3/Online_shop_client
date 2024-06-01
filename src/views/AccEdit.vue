<template>
    <div>

        <Navigation></Navigation>
    
        <div v-if="userData.photo" class="mx-10 my-7 lg:my-5 flex flex-col justify-center items-center space-y-10">
            
            <h1 class=" text-slate-400 font-bold text-2xl font-comfortaa">Edit Account Details</h1>

            <div class="space-y-12">

                <!-- Image -->
                <div class="size-52 lg:size-60 mx-auto">
                    <img class="rounded-full border border-gray-200 shadow-sm" :src="userData.photo" alt="">                    
                </div>

                <!-- DropZone -->
                <div class="space-y-3">
        
                    <h2 class="font-medium text-slate-700">Update Profile picture</h2>
                    
                    <div @dragover.prevent="dragOver" @drop.prevent="drop" class="flex items-center justify-center w-full">
                    <label for="dropzoneFile" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100">
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
                <div class="space-y-8">
                    
                    <div class=" font-medium text-slate-700">
                        Username - 
                        <input v-model="updateUserData.name" class="bg-transparent outline-none ms-3 focus:none appearance-none focus:ring-0 border-0 border-b-[1px] focus:border-green-400 duration-300 py-0" type="text">
                    </div>

                    <div class=" font-medium text-slate-700">
                        Email - 
                        <input v-model="updateUserData.email"  class="bg-transparent outline-none ms-3 focus:none appearance-none focus:ring-0 border-0 border-b-[1px] focus:border-green-400 duration-300 py-0" type="email">
                    </div>

                    <div class=" font-medium text-slate-700">
                        Phone - 
                        <input v-model="updateUserData.phone" class="bg-transparent outline-none ms-3 focus:none appearance-none focus:ring-0 border-0 border-b-[1px] focus:border-green-400 duration-300 py-0" type="text">
                    </div>

                    <div class=" font-medium text-slate-700">
                        Gender -                         
                        <input v-model="updateUserData.gender" class="bg-transparent outline-none ms-3 focus:none appearance-none focus:ring-0 border-0 border-b-[1px] focus:border-green-400 duration-300 py-0" type="text">
                    </div>

                    <div class=" font-medium text-slate-700">
                        Address - 
                        <input v-model="updateUserData.address" class="bg-transparent outline-none ms-3 focus:none appearance-none focus:ring-0 border-0 border-b-[1px] focus:border-green-400 duration-300 py-0" type="text">
                    </div>

                </div>

                <button @click="SaveEdit()" class=" float-end rounded-xl text-base font-semibold bg-green-600 px-4 py-2 text-slate-50 hover:bg-green-700 duration-300">Save Changes</button>

            </div>
        
        </div>

        <div v-else>
            <Spinner></Spinner>
        </div>

    </div>
</template>

<script>

import Navigation from '../components/Navigation.vue'
import Spinner from '../components/Spinner.vue'
import useUser from '../composables/useUser.js'
import { onMounted, reactive, ref } from 'vue';
export default {
  components: {
     Navigation, Spinner },
    
    setup () {

        let {userData, getUserData} = useUser();
        const dropzoneFile = ref(null);
        const fileInput = ref(null);

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


        let SaveEdit = () => {
            console.log(updateUserData.name);
            console.log(updateUserData.email);
            console.log(updateUserData.phone);
            console.log(updateUserData.gender);
            console.log(updateUserData.address);
            console.log(dropzoneFile.value);
        }
    
        const drop = (e) => {
            dropzoneFile.value = e.dataTransfer.files[0];
        };
    
        const selectedFile = () => {
            dropzoneFile.value = fileInput.value.files[0];
        };
    
        const dragOver = (e) => {
            e.preventDefault();
        }
    
        return {userData, updateUserData, SaveEdit, dropzoneFile, drop, selectedFile, fileInput, dragOver };

    }
}
</script>
