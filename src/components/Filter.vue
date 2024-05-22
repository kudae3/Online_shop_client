<template>
        <!-- Filter -->
        <div class="sm:flex justify-between items-center space-y-7 sm:space-y-0">
            
            <div>
                <form>
                    <input class=" font-medium border-gray-400 border-b-[1px] outline-none py-1 px-2" type="text" placeholder="Search">
                </form>
            </div>
            
            <div class="text-slate-600 font-medium space-x-3 flex items-center ">
                <h2 class="cursor-pointer hover:text-orange-700 duration-200 ">All</h2> 
                <h2 class="cursor-pointer hover:text-orange-700 duration-200 ">Clothing</h2> 
                <h2 class="cursor-pointer hover:text-orange-700 duration-200 ">Electronic</h2>
                <h2 class="cursor-pointer hover:text-orange-700 duration-200 ">Domestics</h2>
            </div>

        </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>