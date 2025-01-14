<template>
    <!-- Pagination -->
    <div v-if="links.length > 0" class="flex justify-center items-center pt-10 space-x-1">
        <div v-for="link in links">
            <button 
                :disabled="link.url==null" 
                @click="getURL(link.url)" 
                v-html="link.label" 
                class="rounded-full border font-semibold border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" >                            
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['links', 'getURL'],
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>