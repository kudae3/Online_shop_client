<template>
    <div>
        
        <Navigation></Navigation>

        <!-- Product detail -->
        <div class="m-10 md:mx-20 lg:mx-40 sm:flex justify-center space-y-5 sm:space-y-0 sm:space-x-5">
            
            <div>
                <img class="rounded-md shadow-md" :src="photo" alt="">
            </div>

            <div class="space-y-7">
                <h1 class="text-3xl font-semibold text-slate-500">{{ product.name }}</h1>
                <h2 class="text-blue-700 text-xl font-semibold">{{ product.price }} $</h2>
                <h3 class="text-slate-600">{{ product.description }}</h3>
                

                <div class=" grid grid-cols-3 gap-3 items-center">
                    
                    <div @click="count > 1 && count--" class="p-2 rounded-full border w-fit hover:bg-orange-400 duration-300 cursor-pointer">
                    <i class="fa-solid fa-minus"></i>
                    </div>
                                    
                    <input v-model="count" type="number" class="outline-none font-bold py-1 text-slate-600 px-2 text-2xl" min="1">
                                
                    <div @click="count++" class="p-2 rounded-full border w-fit hover:bg-orange-400 duration-300 cursor-pointer">
                    <i class="fa-solid fa-plus"></i>
                    </div>
                
                </div>

                <button @click="addCart()" class="bg-green-500 text-slate-50 font-semibold px-3 py-2 rounded-2xl hover:bg-green-700 shadow-lg duration-300 w-full">
                    Add to Cart
                    <i class="fa-solid fa-cart-plus ps-2"></i>
                </button>
                
            </div>

        </div>        

    </div>
</template>

<script>
import { onMounted } from 'vue';
import axios from 'axios'
import { ref } from 'vue';
import Navigation from '../components/Navigation.vue'
export default {
  
    components: { Navigation },
    
    props: ['id'],
  
    setup (props) {

        let product = ref('')
        let photo = ref('')
        let count = ref('1')

        let getProduct = () => {
            axios.get('http://127.0.0.1:8000/api/detail/product',{
                params: {
                    id: props.id
                }
            })
            .then(res => {
                product.value = res.data.product
                photo.value = "http://127.0.0.1:8000/storage/"+res.data.product.photo
            })
            .catch(err => {
                console.error(err); 
            })
        }

        let addCart = () => {
            console.log(count.value);
        }

        onMounted( ()=>{
            getProduct()
        } )

        return {product, photo, count, addCart}
    }
}
</script>