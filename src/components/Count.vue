<template>
    <div>
        <button @click="count++">Add 1</button>
        <p>Count is: {{ count }}</p>
    </div>
</template>

<script>

import { ref } from 'vue';

export default {
    
    setup () {
        
        let count = ref(0);

        return {count}
    }
}
</script>

<style>

</style>