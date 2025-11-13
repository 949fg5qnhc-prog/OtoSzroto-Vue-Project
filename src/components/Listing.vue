<script setup>
import { defineProps, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    listing: Object,
});





</script>

<template>
    <section class="py-8">
        <div class="container-xl lg:container m-auto bg-blue-950 text-white p-6 rounded-lg">
            <h1 class="text-3xl font-bold mb-6">Sprzedam</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <img :src='listing.path1' class="w-48 h-28 object-cover rounded-lg" />

                <div class="text-white my-2">{{ listing.make }}</div>
                <div class="text-white my-2">{{ listing.model }}</div>
                <div class="text-gray-400 my-2 text-sm">{{ listing.year }}</div>
                <div class="text-gray-400 my-2 text-xl2">{{ listing.price + ' zł' }}</div>
                <div class="text-gray-400 my-1 ml-2 text-sm">{{ listing.fuel + '   ' }} {{ listing.mileage + ' km' }}</div>
              

                <RouterLink 
                :to="'/listings/' + listing.id" 
                class="h-[36px] bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-center text-sm">
                    Oglądaj
                </RouterLink>
                
        </div>
        </div>
    </section>
</template>