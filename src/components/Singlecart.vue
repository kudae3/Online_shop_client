<template>
  <tr class="dark:bg-slate-800" >
    
    <td class="text-start" >
      <p class="px-6 py-4 text-slate-600 dark:text-slate-200 font-medium whitespace-nowrap">{{ cart.product_name }}</p>
    </td>
    
    <td class="text-center" >
      <p class="px-6 py-4 text-slate-600 dark:text-slate-200 font-medium">$ {{ cart.price }}</p>
    </td>

    <td class="text-center">
      <p class="px-6 py-4 text-slate-600 dark:text-slate-200 font-medium" >{{ quantity }}</p>
    </td>

    <td class="text-center">
      <p class="px-6 py-4 text-slate-600 dark:text-slate-200 font-medium whitespace-nowrap" >$ {{ totalPrice }}</p>
    </td>

    <td class="text-center">
      <p class="px-6 py-4 font-medium whitespace-nowrap dark:text-slate-200">{{ moment(cart.created_at).format(" DD-MM-YYYY, h:mm a") }}</p>
    </td>

    <td class="px-6 py-4">
      <i @click="Remove()"
        class="fa-regular fa-circle-xmark cursor-pointer hover:text-red-600"
      ></i>
    </td>
  
  </tr>
</template>

<script>
import moment from "moment";
import { ref } from "vue";
import axios from 'axios'

export default {
  props: ["cart"],
  setup(props) {
    let quantity = props.cart.quantity;
    
    let totalPrice = ref(props.cart.quantity * props.cart.price);

    let Remove = () => {
      axios.post('http://127.0.0.1:8000/api/delete/cart',{
        id: props.cart.id
      })
      .then(res => {
        location.reload();
      })
      .catch(err => {
        console.error(err); 
      })
    }

    return { moment, quantity, totalPrice, Remove };
  },
};
</script>
