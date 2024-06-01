<template>
    <div>

        <Navigation></Navigation>

        <div class="mx-10 my-10 md:mx-20 lg:mx-32">
            <div class="relative overflow-x-auto h-fit  sm:rounded-lg">

                <div v-if="errMsg" class="flex justify-center items-center">
                    <h2 class="text-red-400 font-medium text-lg py-7">No order yet! 😓</h2>
                </div>
                
                <table v-else-if="orders.length" class="w-full text-sm text-left rtl:text-right text-gray-500 ">

                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Order id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Order Code
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Total Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody v-for="order in orders" :key="order.id">
                        <Singleorder :order="order" ></Singleorder>
                    </tbody>

                </table>

                <div v-else>
                    <Spinner></Spinner>
                </div>

            </div>
        </div>
        
    </div>
</template>

<script>

import Spinner from '../components/Spinner.vue'
import Singleorder from '../components/Singleorder.vue'
import { onMounted, ref } from 'vue';
import Navigation from '../components/Navigation.vue'
import useUser from '../composables/useUser';
import axios from "axios"
export default {
  components: {
    Spinner,
    Singleorder, Navigation },
    setup () {
        
        let orders = ref([])
        let errMsg = ref(false)
        let {userData, getUserData} = useUser();

        onMounted(async()=>{
            await getUserData()
            getOrder()
        })

        let getOrder = () => {

            errMsg.value = false
            
            axios.get('http://127.0.0.1:8000/api/view/order', {
                params: {
                    user_id: userData.id
                }
            })
                .then(res => {

                    if(res.data.orders.length){
                        orders.value = res.data.orders
                    }
                    else{
                        errMsg.value = true
                    }
                    
                })
                .catch(err => {
                    console.error(err); 
                })
        } 

        return {orders, errMsg}
    }
}
</script>
