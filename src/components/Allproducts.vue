<template>
  
  <!-- products -->
  <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-10">
    
    <div v-for="product in products" :key="product.id">
      <SingleProduct :product = "product"></SingleProduct>
    </div>
  
  </div>

</template>

<script>

import SingleProduct from "./SingleProduct.vue";
import axios from 'axios'
export default {
  
  components: {
    SingleProduct,
  },

  props: ["products"],

  setup() {

    return {};
  },
};
</script>
