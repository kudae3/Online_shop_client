<template>
  <tr class="dark:bg-slate-800">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-slate-200">{{ order.id }}</th>
    <td class="px-6 py-4 dark:text-slate-200">{{ order.order_code }}</td>
    <td class="px-6 py-4 flex space-x-2 items-center dark:text-slate-200">$ {{ order.total_price }}</td>
    <td class="px-6 py-4 dark:text-slate-200">{{ status }}</td>
  </tr>
</template>

<script>
import { ref } from 'vue';

export default {

    props: ["order"],

    setup(props) {

        let status = ref('')

        if(props.order.status === '0'){
            status.value = 'Pending'
        }
        else if (props.order.status === '1'){
            status.value = 'Accepted'
        }
        else{
            status.value = 'Rejected'
        }
        
        
        return {status};
    },
};
</script>
