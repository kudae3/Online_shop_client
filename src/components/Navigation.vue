<template>
    <!-- Nav bar -->
    <div class="bg-slate-400 dark:bg-slate-500 flex justify-between items-center h-14 min-w-full py-2 px-5 md:px-20 lg:px-36 shadow-md fixed top-0 z-30">
        
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
                <router-link :to="{name: 'cart'}" class="px-2 py-1 hover:text-lime-900 duration-200 "><i class="fa-solid fa-cart-shopping"></i></router-link>
                <router-link :to="{name: 'order'}" class="px-2 py-1 hover:text-lime-900 duration-200 "><i class="fa-solid fa-truck"></i></router-link>
            </div>
        
        </div>

        <!-- Dark Mode and account -->
        <div class="flex space-x-3 justify-center items-center">
            
            <!-- Switch mood and account-->
            <div class="flex space-x-3 md:text-xl">
                
                <button @click="toggleState" class="px-2 py-1 hover:text-lime-900 dark:hover:text-slate-400 duration-300">
                    <i :class="{ 'fa-solid fa-moon': !isDark, 'fa-solid fa-lightbulb': isDark }"></i>
                </button>
                
                <router-link :to="{name: 'accCenter'}" class="px-2 py-1 hover:text-lime-900 dark:hover:text-slate-400 duration-300">
                    <i class="fa-solid fa-user"></i>
                </router-link>
                
                <button @click="Logout()" class="px-2 py-1 hover:text-red-900 duration-200 text-red-800"><i class="fa-solid fa-right-from-bracket"></i></button>
            
            </div>

            <!-- Mobile menu -->
            <div @click="toggleMobileMenu" class="md:hidden duration-700 cursor-pointer text-xl pr-3">
                <i class="fa-solid fa-bars text-black"></i>
            </div>
        </div>
    
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup () {
        const mobileSlide = ref("-100%");
        let router = useRouter();

        let isDark = ref();

        let toggleMobileMenu = () => {
            mobileSlide.value = mobileSlide.value === "0px" ? "-100%" : "0px";
        }

        let Logout = () => {
            localStorage.removeItem('userToken');
            router.push({name: 'login'});
        }

        const toggleState = () => {
            
            isDark.value = !isDark.value;
            
            localStorage.setItem('theme', isDark.value ? 'dark' : 'light'); 

            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }

        };

        onMounted(() => {
            const storedTheme = localStorage.getItem('theme');
            
                if (storedTheme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark')
                    isDark.value = true;
                } else {
                    document.documentElement.classList.remove('dark')
                }

        })

        return { mobileSlide, toggleMobileMenu, Logout, isDark, toggleState };
    }
}
</script>