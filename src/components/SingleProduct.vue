<template>
  
  <div class="flex flex-col justify-center items-center space-y-1">
    
    <div class="relative">
      
      <router-link :to="{name: 'detail', params: {id: product.id}}">
          <img
          class="rounded-md cursor-pointer hover:scale-105 duration-300"
          :src="photo"
          alt=""
        />
      </router-link>
      
      <div class="absolute top-1 left-2">
        <button class="text-red-400 hover:text-red-900">
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>
    
    </div>
    <p class="font-medium text-slate-500 text-sm">{{ product.name }}</p>
    <p class="font-medium text-sm text-slate-700">$ {{ product.price }}</p>
  
  </div>

</template>

<script>

import { ref } from 'vue';

export default {
  
  props: ["product"],
  
  setup(product) {

    let photo = ref('')

    if (product.product.photo) {
      photo.value = "http://127.0.0.1:8000/storage/"+product.product.photo
    } else {
      photo.value = "http://127.0.0.1:8000/storage/no-image-available.jpg"
    }
    
    return {photo};
  },
};
</script>
