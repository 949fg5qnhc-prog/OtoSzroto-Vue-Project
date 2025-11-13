<script setup>
import Card from '@/components/Card.vue';
import {RouterLink} from 'vue-router';
</script>

<template>
    <section class="py-4">
        <div class="container-xl lg:container m-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-red-50">
                <Card>
                    <h2 class="text-2xl font-bold">Dla kupujących</h2>
                    <p class="mt-2 mb-4">
                        Przeglądaj nasze oferty
                    </p>
                    <RouterLink
                        to="/listings"
                        class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
                    >
                        Przeglądaj oferty 
                    </RouterLink>
                </Card>
                <Card bg="bg-red-100">
                    <h2 class="text-2xl font-bold">Dla sprzedających</h2>
                    <p class="mt-2 mb-4">
                        Dodaj swoje ogłoszenie
                    </p>
                    <RouterLink
                        to="/listings/add"
                        class="inline-block bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
                    >
                        Dodaj ogłoszenie
                    </RouterLink>
                </Card>
                </div>
        </div>
    </section>
</template>