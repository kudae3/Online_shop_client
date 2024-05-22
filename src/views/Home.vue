<template>
    <div>
        
        <Navigation></Navigation>    

        <div class="mx-10 my-7 md:mx-20 lg:mx-32 space-y-10">
            
            <!-- search and filter -->
            <Filter></Filter>

            <Allproducts :products="products"></Allproducts>
        
        </div>
  
    </div>

</template>

<script>
import Filter from '../components/Filter.vue'
import Allproducts from '../components/Allproducts.vue'
import axios from 'axios'
import Navigation from '../components/Navigation.vue'
import { onMounted, ref } from 'vue';
export default {
  
    components: {
    Filter,
    Allproducts, Navigation },
    
    setup () {

        let products = ref('')

        onMounted(()=>{
            axios.get('http://127.0.0.1:8000/api/get/products')
            .then(res => {
                // console.log(res.data.products)
                products.value = res.data.products
            })
            .catch(err => {
                console.error(err); 
            })
        })

        return {products}
        
    }
}
</script>