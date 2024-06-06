<template>
    <div>

        <Navigation></Navigation>
        
        <div v-if="userData.photo" class="mx-10 my-7 lg:my-5 flex flex-col justify-center items-center space-y-10">
        
            <h1 class="text-slate-400 font-bold text-2xl font-comfortaa">Account Center</h1>

            <div class="space-y-5 w-fit sm:w-[400px] rounded-lg p-10 bg-slate-100 dark:bg-slate-800">
                
                <router-link :to="{name: 'accDetail'}" class="cursor-pointer">
                    <div class="flex items-center space-x-3">
                        <img class="size-12 rounded-full " :src="userData.photo" alt="">   
                        <p class="font-semibold text-gray-600 hover:text-gray-800 dark:text-slate-100 hover:dark:text-slate-300">{{ userData.name }}</p>
                    </div>
                </router-link>

                <hr>

                <router-link :to="{name: 'changePass'}" class="cursor-pointer">
                    <div class="flex items-center space-x-1">
                        <div class="size-12 rounded-full flex justify-center items-center dark:text-gray-300"><i class="fa-solid fa-key fa-lg"></i></div>
                        <p class="font-semibold text-gray-600 hover:text-gray-800 dark:text-slate-100 hover:dark:text-slate-300">Change Password</p>
                    </div>
                </router-link>

            </div>
    
        </div>

        <div v-else>
            <Spinner></Spinner>
        </div>
    
    </div>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import Spinner from '../components/Spinner.vue'
import useUser from '../composables/useUser.js'
import { onMounted } from 'vue';
export default {
  components: {
    Navigation, Spinner },
    setup () {

        let {userData, getUserData} = useUser();

        onMounted(()=>{
            getUserData();
        })
        

        return {userData}
    }
}
</script>
