<template>
    <div>
        <Navigation></Navigation>
        <div class=" mx-10 my-24 md:mx-20 lg:mx-32 text-center space-y-10">
            <h3 class="text-xl font-semibold text-red-400 font-comfortaa">Sorry this page doesn't exist! 😢</h3>
            <router-link :to="{name: 'home'}" class="block">
                <button class="bg-green-500 hover:bg-green-700 duration-200 px-3 py-2 rounded-lg text-white font-semibold shadow-md">
                    Back to Home Page
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
import Navigation from '../components/Navigation.vue'
export default {
  components: { Navigation },
    setup () {
        

        return {}
    }
}
</script>