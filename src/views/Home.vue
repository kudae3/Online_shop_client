<template>
    <div class="dark:bg-slate-900">
        
        <Navigation></Navigation>  

        <div class="mx-10 my-20 md:mx-20 lg:mx-32 space-y-10">
            
            <!-- searching and filter-->
            <div class="sm:flex justify-between items-center space-y-7 sm:space-y-0">
            
                <div>                    
                    <input v-model="search" class="font-medium border-gray-400 border-b-[1px] outline-none py-1 px-2 dark:bg-slate-900 dark:text-slate-100" type="text" placeholder="Search">                   
                </div>
                
                <div class="text-slate-600 font-medium flex items-center space-x-3 md:space-x-5">
                    <h2 @click="Filter()" class="cursor-pointer hover:text-orange-700 duration-200 dark:text-slate-200">All</h2>
                    <div v-for="category in categories" :key="category.id" class=" space-x-3 md:space-x-5">
                        <h2 @click="Filter(category.id)" class="cursor-pointer hover:text-orange-700 duration-200 dark:text-slate-200">{{ category.name }}</h2> 
                    </div>
                </div>

            </div>

            <div v-if="errorMsg" class="flex justify-center items-center">
                <p class="font-medium text-lg text-red-500">No Product Found !</p>
            </div>

            <div v-else-if="products.length">
                <Allproducts :products="products"></Allproducts>
                <Pagination :links="links" :getURL="getURL"></Pagination>
            </div>

            <div v-else>
                <Spinner></Spinner>
            </div>
        
        </div>
  
    </div>

</template>

<script>
import Pagination from '../components/Pagination.vue'
import Spinner from '../components/Spinner.vue'
import Allproducts from '../components/Allproducts.vue'
import axios from 'axios'
import Navigation from '../components/Navigation.vue'
import { onMounted, ref, watch } from 'vue';
import debounce from 'lodash/debounce';
export default {
  
    components: {
    Pagination,
    Spinner,
    Allproducts, Navigation },
    
    setup () {

        let products = ref('')
        let categories = ref('')
        let search = ref('')
        let errorMsg = ref(false);
        let links = ref('');

        watch(search, debounce(() => {
            axios.get('http://127.0.0.1:8000/api/get/products/?search='+search.value)
            .then(res => {                
                if (res.data.products.data && res.data.products.data.length > 0) {
                    errorMsg.value = false;
                    products.value = res.data.products.data; 
                }else {
                    errorMsg.value = true;
                }
            })
            .catch(err => {
                console.error(err); 
            })
        }, 300))

        let getURL = (url) => {
            axios.get(url)
            .then(res => {
                links.value = res.data.products.links;
                products.value = res.data.products.data;
            })
            .catch(err => {
                console.error(err); 
            })
        }

        let getProducts = () =>{
            axios.get('http://127.0.0.1:8000/api/get/products')
            .then(res => {
                    links.value = res.data.products.links;
                    products.value = res.data.products.data;
                })
                .catch(err => {
                    console.error(err);
                });
        };

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

            errorMsg.value = false
            axios.get('http://127.0.0.1:8000/api/filter/category', {
                params: {
                    id
                }
            })
            
            .then(res => {
                if(res.data.products.length){
                    products.value = res.data.products
                }
                else{
                    errorMsg.value = true
                }
            })
            .catch(err => {
                console.error(err); 
            })
        
        }

        onMounted(()=>{
            getProducts()
            getCategories()            
        })

        return {products, categories,errorMsg, Filter, search, getURL, links}
        
    }
}
</script>