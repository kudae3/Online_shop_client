<template>
    <div>
        
        <Navigation></Navigation>    

        <div class="mx-10 my-7 md:mx-20 lg:mx-32 space-y-10">
            
            <!-- searching and filter-->
            <div class="sm:flex justify-between items-center space-y-7 sm:space-y-0">
            
                <div>
                    <form>
                        <input class=" font-medium border-gray-400 border-b-[1px] outline-none py-1 px-2" type="text" placeholder="Search">
                    </form>
                </div>
                
                <div class="text-slate-600 font-medium flex items-center space-x-3 md:space-x-5">
                    <h2 @click="Filter()" class="cursor-pointer hover:text-orange-700 duration-200 ">All</h2>
                    <div v-for="category in categories" :key="category.id" class=" space-x-3 md:space-x-5">
                        <h2 @click="Filter(category.id)" class="cursor-pointer hover:text-orange-700 duration-200 ">{{ category.name }}</h2> 
                    </div>
                </div>

            </div>

            <Allproducts :products="products"></Allproducts>
        
        </div>
  
    </div>

</template>

<script>
import Allproducts from '../components/Allproducts.vue'
import axios from 'axios'
import Navigation from '../components/Navigation.vue'
import { onMounted, ref } from 'vue';
export default {
  
    components: {
    Allproducts, Navigation },
    
    setup () {

        let products = ref('')
        let categories = ref('')

        let getProducts = () =>{
            axios.get('http://127.0.0.1:8000/api/get/products')
            .then(res => {
                products.value = res.data.products
            })
            .catch(err => {
                console.error(err); 
            })
        }

        let getCategories = () =>{
            axios.get('http://127.0.0.1:8000/api/get/categories')
            .then(res => {
                categories.value = res.data.categories
            })
            .catch(err => {
                console.error(err); 
            })
        }

        let Filter = (id) => {

            axios.get('http://127.0.0.1:8000/api/filter/category', {
                params: {
                    id
                }
            })
            
            .then(res => {
                products.value = res.data.products
            })
            .catch(err => {
                console.error(err); 
            })
        
        }

        onMounted(()=>{
            getProducts()
            getCategories()
        })

        return {products, categories, Filter}
        
    }
}
</script>