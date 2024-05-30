<template>
    <!-- Nav bar -->
    <div class="bg-slate-400 flex justify-between items-center h-14 min-w-full py-2 px-5 md:px-20 lg:px-36 shadow-sm">
        
        <!-- Logo -->
        <div class="flex space-x-7">
            <router-link :to="{name: 'home'}">
                <h2 class="font-dancing-srcipt text-4xl font-semibold text-white">Shauzk</h2>
            </router-link>
        </div>
        
        <!-- Nav items -->
        <div :style="{ right: mobileSlide }" class="fixed bg-slate-400 w-screen md:size-fit flex justify-center items-center px-3 h-screen top-0 right-0 z-20 md:bg-transparent md:static duration-700">
            
            <div @click="toggleMobileMenu" class="absolute top-3 right-5 bg-gray-900 size-9 rounded-full flex justify-center items-center md:hidden">
                <button class="text-xl text-slate-200 ">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            
            <div class=" flex flex-col space-y-8 justify-center items-center text-3xl md:flex-row md:space-y-0 md:space-x-7 md:text-xl">
                <router-link :to="{name: 'cart'}" class="px-2 py-1 hover:text-orange-700 duration-200"><i class="fa-solid fa-cart-shopping"></i></router-link>
                <router-link :to="{name: 'order'}" class="px-2 py-1 hover:text-orange-700 duration-200"><i class="fa-solid fa-truck"></i></router-link>
            </div>
        
        </div>

        <!-- Dark Mode and account -->
        <div class="flex space-x-3 justify-center items-center">
            
            <!-- Switch mood and account-->
            <div class="flex space-x-3 md:text-xl">
                <button class="px-2 py-1 hover:text-orange-700 duration-200"><i class="fa-solid fa-moon"></i></button>
                <!-- <button class="px-2 py-1 hover:text-orange-700 duration-200"><i class="fa-solid fa-lightbulb"></i></button> -->
                <button class="px-2 py-1 hover:text-orange-700 duration-200"><i class="fa-solid fa-user"></i></button>
                <button @click="Logout()" class="px-2 py-1 hover:text-red-700 duration-200 text-red-600"><i class="fa-solid fa-right-from-bracket"></i></button>
            </div>

            <!-- Mobile menu -->
            <div @click="toggleMobileMenu" class="md:hidden duration-700 cursor-pointer text-xl pr-3">
                <i class="fa-solid fa-bars text-black"></i>
            </div>
        </div>
    
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup () {
        const mobileSlide = ref("-100%");
        let router = useRouter();

        let toggleMobileMenu = () => {
            mobileSlide.value = mobileSlide.value === "0px" ? "-100%" : "0px";
        }

        let Logout = () => {
            localStorage.removeItem('userToken');
            router.push({name: 'login'});
        }

        return { mobileSlide, toggleMobileMenu, Logout };
    }
}
</script>