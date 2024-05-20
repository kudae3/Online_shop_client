<template>
    <div>
        <h1 class="font-semibold text-cyan-500">Home Page - Username : {{ userData.name }}</h1>
        <Count></Count>
    </div>
</template>

<script>
    import { computed } from 'vue';
    import Count from '../components/Count.vue'
    import store from '../store';
    export default {
        
        components: { Count },
        
        setup(){
            
            let userData = computed(()=>store.getters.storageUser)

            return {userData}
        }
        
    
    }
</script>

<style>

</style>