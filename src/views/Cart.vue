<template>
    <div>
    
        <Navigation></Navigation>
        
        <div class="mx-10 my-10 md:mx-20 lg:mx-32 lg:flex justify-center space-y-5 lg:space-y-0 lg:space-x-7">

            <!-- Cart -->
            <div class="relative overflow-x-auto h-fit shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">

                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-center">
                                Product name
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Price per item
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Quantity
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Total price
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Date
                            </th>  
                            <th scope="col" class="px-6 py-3 text-center">
                                
                            </th>                            
                        </tr>
                    </thead>

                    <tbody v-for="cart in carts" :key="cart.id">

                        <Singlecart :cart="cart"></Singlecart>

                    </tbody>
                
                </table>
            </div>

            <!-- Cart Summary -->
            <div class="lg:w-1/3 shadow-lg">
                
                <h2 class="font-semibold text-slate-50 text-lg p-4 bg-slate-400 rounded-t-2xl"> <i class="fa-solid fa-clipboard-list"></i> Cart Summary</h2>
                
                <div class="bg-slate-50 shadow-md p-10 space-y-6 rounded-b-lg">
                    
                    <div class="flex justify-between items center font-medium text-slate-700 text-xl">
                        <p class="text-lg">Subtotal</p>
                        <h3 class="text-lg">$ {{ subtotal }}</h3>
                    </div>

                    <div class="flex justify-between items center font-medium text-slate-700 text-xl">
                        <p class="text-lg">Shipping</p>
                        <h3 class="text-lg">$ 10</h3>
                    </div>

                    <hr>

                    <div class="flex justify-between items center font-medium text-slate-700 text-xl">
                        <p class="text-lg">Total</p>
                        <p class="text-lg">$ {{ subtotal + 10 }}</p>
                    </div>
                    
                    <button class="w-full rounded-lg  text-lg p-2 font-semibold bg-green-500 hover:bg-green-700 duration-300 text-slate-100">Proceed to Checkout</button>


                </div>

            </div>

        </div>

    </div>
</template>

<script>

import Singlecart from '../components/Singlecart.vue'
import { onMounted, ref} from 'vue';
import axios from 'axios'
import Navigation from '../components/Navigation.vue'
import useUser from '../composables/useUser';
import moment from 'moment'


export default {
  components: {
    Singlecart,
    Navigation },
    
    setup () {
        
        let {userData, getUserData} = useUser();
        
        let carts = ref([])
        let subtotal = ref('')

        onMounted(async()=>{
            await getUserData()
            getCart()
        })

        let getCart = async() => {
            await axios.get('http://127.0.0.1:8000/api/view/cart', {params: {
                user_id : '10'
            }})
            .then(res => {
                carts.value = res.data.cart
                subtotal.value = carts.value.reduce((acc, cart) => acc + (cart.quantity * cart.price), 0);
            })
            .catch(err => {
                console.error(err); 
            })
        }


        return {carts, moment, subtotal}
    }

}
</script>
