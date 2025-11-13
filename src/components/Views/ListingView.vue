<script setup>
import axios from 'axios'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { reactive, ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const listID = route.params.id;
const toast = useToast();

const state = reactive({
    car: {}
});

const currentImageIndex = ref(0);

const deleteCar = async () => {
    try {
        await axios.delete(`http://localhost:5001/listings/${listID}`);
        router.push('/listings');
        toast.success('Usunięto ogłoszenie');
    } catch (error) {
        console.error('Błąd usuwania ogłoszenia', error);
        toast.error('Błąd usuwania ogłoszenia');
    }
};

onMounted(async () => {
    try {
        const response = await axios.get(`http://localhost:5001/listings/${listID}`);
        state.car = response.data;
    } catch (error) {
        console.error('Błąd wczytywania ogłoszenia', error);
    }
});

const nextImage = () => {
    if (state.car.images && state.car.images.length > 0) {
        currentImageIndex.value = (currentImageIndex.value + 1) % state.car.images.length;
    }
};

const prevImage = () => {
    if (state.car.images && state.car.images.length > 0) {
        currentImageIndex.value =
            (currentImageIndex.value - 1 + state.car.images.length) % state.car.images.length;
    }
};
</script>

<template>
    <section class="bg-red-50">
        <div class="container mx-auto flex flex-col md:flex-row items-center gap-8">

            <div class="relative w-[32rem] h-[24rem] overflow-hidden rounded-lg">
                <img
                    v-if="state.car.images && state.car.images.length"
                    :src="state.car.images[currentImageIndex]"
                    class="absolute inset-0 w-full h-full object-cover rounded-lg transition-all duration-300"
                />
                <img
                    v-else
                    :src="state.car.path || state.car.path1"
                    class="absolute inset-0 w-full h-full object-cover rounded-lg"
                />

                <button
                    v-if="state.car.images && state.car.images.length > 1"
                    @click="prevImage"
                    class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded-full opacity-70 hover:opacity-100"
                >‹</button>

                <button
                    v-if="state.car.images && state.car.images.length > 1"
                    @click="nextImage"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded-full opacity-70 hover:opacity-100"
                >›</button>
            </div>

            <div class="md:w-1/2 text-center md:text-left">
                <h1 class="text-5xl font-bold text-gray-900 mb-4">
                    {{ state.car.make }} {{ state.car.model }}
                </h1>
                <p class="text-sm text-gray-400 mb-2">{{ state.car.year }}</p>
                <div class="w-32 h-18 rounded-2xl bg-black mx-auto my-3">
                    <p class="text-2xl text-white text-center mx-4">{{ state.car.price + ' zł' }}</p>
                </div>
                <p class="text-2xl text-black">
                    <i class='pi pi-map-marker mb-5'>{{ ' ' + state.car.location }}</i>
                </p>
                <p class="text-base text-black">{{ 'VIN: ' + state.car.vin }}</p>
                <p class="text-base text-black">{{ "Przebieg: " + state.car.mileage + ' km' }}</p>
                <p class="text-base text-gray-600">{{ state.car.fuel }}</p>
                <p class="text-base text-gray-800">{{ 'Opis: ' + state.car.description }}</p>
                <p class="text-sm text-gray-500 mt-11">
                    <i class="pi pi-phone">{{ ' ' + state.car.contactPhone }}</i>
                </p>
                <p class="text-sm text-gray-500 mt-0">
                    <i class="pi pi-envelope">{{ ' ' + state.car.contactEmail }}</i>
                </p>
            </div>
            <div></div>

            <RouterLink :to="`/listings/${listID}/edit`" class="w-28 h-18 rounded-xl bg-gray-600 hover:bg-gray-800 text-white">Edytuj Ogłoszenie</RouterLink>
            <button @click="deleteCar" class="w-24 h-18 rounded-xl bg-red-950 mx-auto my-1 text-white">Usuń ogłoszenie</button>
        </div>
    </section>
</template>
