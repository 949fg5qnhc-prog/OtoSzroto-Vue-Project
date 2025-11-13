<script setup>
import {reactive, ref, watch, computed} from 'vue'
import axios from 'axios'
import router from '@/router'
import { useRoute } from 'vue-router';

const route = useRoute();


const selMake = ref('');
const makes = ref([

    {label: 'Audi', value: 'Audi'},
    {label: 'BMW', value: 'BMW'},
    {label: 'Honda', value: 'Honda'},
    {label: 'Toyota', value: 'Toyota'},
    {label: 'Mercedes', value: 'Mercedes'},
    {label: 'Opel', value: 'Opel'},
    
]);


const models = {
    Audi: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'],
    BMW: ['Seria 1', 'Seria 2', 'Seria 3', 'Seria 4', 'Seria 5', 'Seria 6', 'Seria 7', 'Seria 8', 'M1', 'M2', 'M3', 'M4', 'M5'],
    Honda: ['Civic', 'Accord', 'Prelude', 'HR-V', 'Jazz'],
    Toyota: ['Auris', 'Yaris', 'Avensis', 'Corolla', 'Camry', 'Aygo'],
    Mercedes: ['Klasa A', 'Klasa B', 'Klasa C', 'Klasa E', 'Klasa S'],
    Opel: ['Astra', 'Corsa', 'Insignia']
};

const filteredModels = computed(() => {
  return selMake.value ? models[selMake.value] || [] : [];
});

watch (selMake, (newVal) => {
    form.make = newVal;
    form.model = '';
});


const filterListings = () => {
  const query = {
    make: form.make || undefined,
    model: form.model || undefined,
    year: form.year || undefined,
    priceL: form.priceL || undefined,
    priceH: form.priceH || undefined,
    fuel: form.fuel || undefined,
  };
  router.push({ name: 'listings', query });
};





const form = reactive({
    make: '',
    model: '',
    year: '',
    priceL: '',
    priceH: '',
    mileage: '',
    fuel : '',
});

const handleSubmit = () => {
    const newListing = {
        make: form.make,
        model: form.model,
        year: form.year,
        price: form.price,
        mileage: form.mileage,
        fuel: form.fuel,
    };
};

</script>

<template>
    <section>
        <div class="container m-auto max-w-4xl py-18">
            <div class="p-4 rounded-lg bg-blue-800">
                <form @submit.prevent="handleSubmit">
                    <h2 class="text-xl-2 text-white text-center font-bold mb-2">Filtruj ogłoszenia</h2>
                    <div class="grid grid-cols-3 gap-3">

                    <select name="make" id="make" v-model="selMake" class="border rounded w-150 mb-3 h-10 py-2 px-3">
                        <option disabled value="">Marka</option>
                        <option v-for="(item, index) in makes" :key="index" :value="item.value">{{ item.label }}</option>
                    </select>

                    <select name="model" id="model" class="border rounded w-150 py-2 px-3 mb-3 h-10" v-model="form.model" :disabled="!selMake">
                        <option disabled value="">Model</option>
                        <option v-for="(model, index) in filteredModels" :key="index" :value="model">{{ model }}</option>
                    </select>

                    <input v-model="form.year" type="text" id="year" name="year"
                        class="border rounded w-150 py-2 px-3 mb-2" placeholder="Rok produkcji"/>

                    <input v-model.number="form.priceL" type="number" name="priceL" id="priceL"
                        class="border rounded w-150 py-2 px-3 mb-2" placeholder="Cena od" />

                    <input v-model.number="form.priceH" type="number" name="priceH" id="priceH"
                        class="border rounded w-150 py-2 px-3 mb-2" placeholder="Cena do" />

                    <select v-model="form.fuel" name="fuel" id="fuel" class="border rounded w-150 py-2 px-3 mb-3 h-15">
                        <option disabled value="">Rodzaj paliwa</option>
                        <option value="Benzyna">Benzyna</option>
                        <option value="Benzyna + LPG">Benzyna + LPG</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Elektryczny">Elektryczny</option>
                        <option value="Wodór">Wodór</option>
                        <option value="CNG">CNG</option>
                    </select>

                    <button @click="filterListings"
                            class="bg-pink-600 hover:bg-pink-700 border rounded px-3 py-3 mt-4 text-center text-white">
                        Wyszukaj
                    </button>

            </div>
                </form>
            </div>
        </div>

    </section>
</template>