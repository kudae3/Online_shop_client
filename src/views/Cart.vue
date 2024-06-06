<template>
    <div>
    
        <Navigation></Navigation>

        <div v-if="orderSuccess" class="sm:max-w-lg sm:w-full mt-20 mx-5 sm:mx-auto">
            <div class="flex flex-col bg-slate-100 rounded-xl pointer-events-auto dark:bg-green-700">
                <div class="flex justify-between items-center py-2 px-4 ">
                    <h3 class="font-bold text-green-500 dark:text-white">
                        Successfully ordered 🎉
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
        
        <div class="mx-10 my-20 md:mx-20 lg:mx-32 lg:flex justify-center space-y-5 lg:space-y-0 lg:space-x-7">

            <!-- Cart -->
            <div class="relative overflow-x-auto h-fit sm:rounded-lg">
                
                <div v-if="errMsg" class="flex justify-center items-center">
                    <h2 class="text-red-400 font-medium text-lg py-7">No items in the Cart</h2>
                </div>

                <table v-else-if="carts.length" class="w-full text-sm text-left rtl:text-right text-gray-500 ">

                    <thead class="text-xs text-gray-700 dark:bg-slate-600 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-center dark:text-slate-200">
                                Product name
                            </th>
                            <th scope="col" class="px-6 py-3 text-center dark:text-slate-200">
                                Price per item
                            </th>
                            <th scope="col" class="px-6 py-3 text-center dark:text-slate-200">
                                Quantity
                            </th>
                            <th scope="col" class="px-6 py-3 text-center dark:text-slate-200">
                                Total price
                            </th>
                            <th scope="col" class="px-6 py-3 text-center dark:text-slate-200">
                                Date
                            </th>  
                            <th scope="col" class="px-6 py-3 text-center dark:text-slate-200">
                                
                            </th>                            
                        </tr>
                    </thead>

                    <tbody v-for="cart in carts" :key="cart.id">

                        <Singlecart :cart="cart"></Singlecart>

                    </tbody>

                </table>

                <div v-else>
                    <Spinner></Spinner>
                </div>


            </div>

            <!-- Cart Summary -->
            <div v-if="carts.length > 0" class="lg:w-1/3 shadow-lg" >
                
                <h2 class="font-semibold text-slate-50 text-lg p-4 bg-slate-400 dark:bg-slate-600 rounded-t-2xl"> <i class="fa-solid fa-clipboard-list"></i> Cart Summary</h2>
                
                <div class="bg-slate-50 dark:bg-slate-800 shadow-md p-10 space-y-6 rounded-b-lg">
                    
                    <div class="flex justify-between items center font-medium text-slate-700 dark:text-slate-200 text-xl">
                        <p class="text-lg">Subtotal</p>
                        <h3 class="text-lg">$ {{ subtotal }}</h3>
                    </div>

                    <div class="flex justify-between items center font-medium text-slate-700 dark:text-slate-200 text-xl">
                        <p class="text-lg">Shipping</p>
                        <h3 class="text-lg">$ 10</h3>
                    </div>

                    <hr>

                    <div class="flex justify-between items center font-medium text-slate-700 dark:text-slate-200 text-xl">
                        <p class="text-lg">Total</p>
                        <p class="text-lg">$ {{ subtotal + 10 }}</p>
                    </div>
                    
                    <button :disabled="isProceeding" @click="Order()" class="w-full rounded-lg text-lg p-2 font-semibold bg-green-500 hover:bg-green-700 duration-300 text-slate-100 flex items-center justify-center space-x-2">
                        
                        <div v-if="loading" role="status">
                            <svg aria-hidden="true" class="inline size-6 text-gray-200 animate-spin fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                        
                        <div>
                            <p>{{ orderText }}</p>
                        </div>
                    
                    </button>


                </div>

            </div>

        </div>

    </div>
</template>

<script>

import Spinner from '../components/Spinner.vue'
import Singlecart from '../components/Singlecart.vue'
import { onMounted, ref} from 'vue';
import axios from 'axios'
import Navigation from '../components/Navigation.vue'
import useUser from '../composables/useUser';
import moment from 'moment'


export default {
  components: {
    Spinner,
    Singlecart,
    Navigation },
    
    setup () {
        
        let {userData, getUserData} = useUser();
        
        let carts = ref([])
        let subtotal = ref('')
        let orderSuccess = ref(false)
        let loading = ref(false)
        let orderText = ref('Proceed to Checkout')
        let isProceeding = ref(false)
        let errMsg = ref(false)

        onMounted(async()=>{
            await getUserData()
            getCart()
        })

        let getCart = async() => {

            errMsg.value = false
            
            await axios.get('http://127.0.0.1:8000/api/view/cart', {params: {
                user_id : userData.id
            }})
            .then(res => {
                if(res.data.cart.length){
                    carts.value = res.data.cart
                    subtotal.value = carts.value.reduce((acc, cart) => acc + (cart.quantity * cart.price), 0);
                }
                else{
                    errMsg.value = true
                }
            })
            .catch(err => {
                console.error(err); 
            })
        }

        let Order = () => {
            
            loading.value = true,
            orderText.value = 'Proceeding...'
            isProceeding.value = true

            axios.post('http://127.0.0.1:8000/api/add/order', {
                user_id: userData.id,
                subtotal: subtotal.value + 10
            })
            
            .then(res => {
                loading.value = false,
                orderText.value = 'Proceed to Checkout',
                isProceeding.value = false,
                orderSuccess.value = true,
                location.reload()
            })
            .catch(err => {
                console.error(err); 
            })

        } 


        return {carts, moment, subtotal, Order, loading, orderSuccess, orderText, isProceeding, errMsg}
    }

}
</script>
