<template>
  
  <!-- products -->
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
    
    <div v-for="product in products" :key="product.id">
      <SingleProduct :product = "product"></SingleProduct>
    </div>
  
  </div>

</template>

<script>

import SingleProduct from "./SingleProduct.vue";
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
