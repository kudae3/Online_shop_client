<template>
    <div>
        
        <Navigation></Navigation>
            
        <div v-if="isSuccessful" class="sm:max-w-lg sm:w-full mx-10 my-20 sm:mx-auto">
            <div class="flex flex-col bg-slate-100 rounded-xl pointer-events-auto dark:bg-green-700">
                <div class="flex justify-between items-center py-2 px-4 ">
                    <h3 class="font-bold text-green-500 dark:text-white">
                        Successfully added to the Cart 🎉
                    </h3>
                    <button @click="isSuccessful = false" type="button" class="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-slate-200 disabled:opacity-50 disabled:pointer-events-none" data-hs-overlay="#hs-basic-modal">
                    <span class="sr-only">Close</span>
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Product detail -->
        <div v-if="product" class="my-24 mx-10 md:mx-20 lg:mx-40 sm:flex justify-center space-y-5 sm:space-y-0 sm:space-x-5">
            
            <div>
                <img class="rounded-md shadow-md" :src="photo" alt="">
            </div>

            <div class="space-y-7">
                <h1 class="text-3xl font-semibold text-slate-500 dark:text-slate-200">{{ product.name }}</h1>
                <h2 class="text-blue-700 text-2xl font-semibold dark:text-slate-300">{{ product.price }} $</h2>
                <h3 class="text-slate-600 dark:text-slate-200">{{ product.description }}</h3>
                

                <div class=" grid grid-cols-3 gap-3 items-center">
                    
                    <div @click="count > 1 && count--" class="p-2 rounded-full border border-purple-300 w-fit hover:bg-purple-500 duration-300 cursor-pointer dark:text-slate-200">
                    <i class="fa-solid fa-minus"></i>
                    </div>
                                    
                    <input v-model="count" type="number" class="outline-none font-bold py-1 text-slate-600 px-2 text-3xl dark:bg-slate-900 dark:text-slate-100" min="1">
                                
                    <div @click="count++" class="p-2 rounded-full border border-purple-300 w-fit hover:bg-purple-500 duration-300 cursor-pointer dark:text-slate-200">
                    <i class="fa-solid fa-plus"></i>
                    </div>
                
                </div>

                <button :disabled="isAddingToCart"  @click="addCart()" class="bg-green-500 text-slate-50 font-semibold px-3 py-2 rounded-2xl hover:bg-green-700 shadow-lg duration-300 w-full flex items-center justify-center space-x-3">
                    
                    
                    <div v-if="loading" role="status">
                        <svg aria-hidden="true" class="inline size-6 text-gray-200 animate-spin fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                    
                    <div>
                        {{ addCartText }}
                        <i class="fa-solid fa-cart-plus ps-2"></i>
                    </div>
                
                
                </button>          

            </div>

        </div>

        <div v-else>
            <Spinner></Spinner>
        </div>        

    </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { onMounted } from 'vue';
import axios from 'axios'
import { ref } from 'vue';
import Navigation from '../components/Navigation.vue'
import useUser from '../composables/useUser.js';
export default {
  
    components: {
    Spinner, Navigation },
    
    props: ['id'],
  
    setup (props) {

        let product = ref('')
        let photo = ref('')
        let count = ref('1')
        let isSuccessful = ref(false)
        let loading = ref(false)
        let isAddingToCart = ref(false)
        let addCartText = ref('Add to Cart')

        let {userData, getUserData} = useUser()

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

            loading.value = true
            isAddingToCart.value = true
            addCartText.value = 'Adding to Cart'
            
            axios.post('http://127.0.0.1:8000/api/add/cart', {
                    user_id: userData.id,
                    product_id: product.value.id,
                    count: count.value,
                    price: product.value.price,
                })
            
            .then(res => {
                isSuccessful.value = true
                loading.value = false
                isAddingToCart.value = false
                addCartText.value = 'Add to Cart'
            })
            .catch(err => {
                console.error(err); 
            })

        }

        onMounted( ()=>{
            getProduct()
            getUserData()
        } )

        return {addCartText, loading, isSuccessful, isAddingToCart, product, photo, count, addCart}
    }
}
</script>