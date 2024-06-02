<template>
    <div>

        <Navigation></Navigation>
    
        <div v-if="userData.photo" class="mx-10 my-7 lg:my-5 flex flex-col justify-center items-center space-y-10">
            
            <h1 class=" text-slate-400 font-bold text-2xl font-comfortaa">Account Details</h1>

            <div class="space-y-12">

                <!-- Image -->
                <div class="size-52 lg:size-60">
                    <img class="rounded-full border border-gray-200 shadow-md" :src="userData.photo" alt="">
                </div>

                <!-- Detail text -->
                <div class="space-y-8">
                    <h1 class="font-medium text-slate-700">Username - {{ userData.name }}</h1>
                    <h1 class="font-medium text-slate-700">Email - {{ userData.email }}</h1>
                    <h1 class="font-medium text-slate-700">Phone - {{ userData.phone}}</h1>
                    <h1 class="font-medium text-slate-700">Gender - {{ userData.gender }}</h1>
                    <h1 class="font-medium text-slate-700">Address - {{ userData.address }}</h1>
                </div>

                <button @click="GoEdit()" class=" float-end rounded-xl font-semibold bg-green-600 px-4 py-2 text-slate-50 hover:bg-green-700 duration-300">Edit</button>

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
import { useRouter } from 'vue-router';
export default {
  components: { Navigation, Spinner },
    setup () {

        let {userData, getUserData} = useUser();
        let router = useRouter()

        onMounted(()=>{
            getUserData();
        })

        let GoEdit = () => {
            router.push({name: 'accEdit'})
        }
        

        return {userData, GoEdit}
    }
}
</script>
