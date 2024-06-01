<template>
    
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

</template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const dropzoneFile = ref(null);
      const fileInput = ref(null);
  
      const drop = (e) => {
        dropzoneFile.value = e.dataTransfer.files[0];
      };
  
      const selectedFile = () => {
        dropzoneFile.value = fileInput.value.files[0];
      };
  
      const dragOver = (e) => {
        e.preventDefault();
      }
  
      return { dropzoneFile, drop, selectedFile, fileInput, dragOver };
    },
  };
  </script>
  