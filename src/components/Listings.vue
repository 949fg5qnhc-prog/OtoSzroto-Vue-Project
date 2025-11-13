<script setup>
import axios from 'axios';
import { onMounted, reactive, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import Listing from '@/components/Listing.vue';

const route = useRoute();

const state = reactive({
    listings: [],
    isLoading: true,
});

const fetchListings = async () => {
    try {
        const response = await axios.get('http://localhost:5001/listings');
        state.listings = response.data;
        state.isLoading = false;
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
};

const filteredListings = computed(() => {
  const query = route.query;

  return state.listings.filter(listing => {
    const price = Number(listing.price);

    if (query.priceL && price < Number(query.priceL)) return false;
    if (query.priceH && price > Number(query.priceH)) return false;

    if (query.make && listing.make !== query.make) return false;
    if (query.model && listing.model !== query.model) return false;
    if (query.year && listing.year.toString() !== query.year.toString()) return false;
    if (query.fuel && listing.fuel !== query.fuel) return false;

    return true;
  });
});


watch(() => route.query, () => {
    console.log('Query changed, filtered listings updated');
});

onMounted(fetchListings);
</script>

<template>
    <section class="bg-red-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <div v-if="state.isLoading" class="text-center text-gray-500">Loading...</div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Listing v-for="listing in filteredListings" 
                         :key="listing.id" 
                         :listing="listing">
                </Listing>
                <div v-if="filteredListings.length === 0" class="col-span-full text-center text-gray-600">
                    Brak wyników pasujących do wyszukiwania.
                </div>
            </div>
        </div>
    </section>
</template>
