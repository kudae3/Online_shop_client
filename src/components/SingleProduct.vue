<template>
  <article class="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
    <router-link :to="{name: 'detail', params: {id: product.id}}">
      <img
        alt=""
        :src="photo"
        class="h-56 w-full object-cover transition hover:scale-110 duration-700"
      />
    </router-link>
  
    <div class="bg-white dark:text-slate-200 dark:bg-slate-800 p-4 sm:p-6">
  
      <router-link :to="{name: 'detail', params: {id: product.id}}">
        <h3 class="mt-0.5 text-lg ">{{ product.name }}</h3>
      </router-link>
  
      <p class="mt-2 line-clamp-3 text-sm/relaxed">
        {{ product.price }} $
      </p>
    </div>
  </article>
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
