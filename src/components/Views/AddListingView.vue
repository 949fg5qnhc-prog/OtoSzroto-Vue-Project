<script setup>
import axios from 'axios';
import router from '@/router';
import { reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';

const form = reactive({
    make: '',
    model: '',
    description: '',
    year: '',
    price: '',
    mileage: '',
    location: '',
    contactEmail: '',
    contactPhone: '',
    fuel : '',
    vin: '',
    images: [] 
});

const previews = ref([]); 
const toast = useToast();


const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    previews.value = [];
    form.images = [];

    files.forEach((file, index) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64 = reader.result;

            
            const key = `path${index + 1}`;
            form[key] = base64;
            form.images.push(base64);

            previews.value.push(URL.createObjectURL(file));
        };

        reader.readAsDataURL(file);
    });
};

const handleSubmit = async () => {
    const newListing = {
        make: form.make,
        model: form.model,
        description: form.description,
        year: form.year,
        price: form.price,
        mileage: form.mileage,
        location: form.location,
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone,
        fuel: form.fuel,
        vin: form.vin,
        ...form 
    };

    try {
        const response = await axios.post('http://localhost:5001/listings', newListing);
        router.push(`/listings/${response.data.id}`);
        toast.success('Dodano ogłoszenie!');
    } catch (error) {
        console.error('Błąd dodawania ogłoszenia: ', error);
        toast.error('Błąd w dodawaniu ogłoszenia');
    }
};
</script>

<template>
<section class="bg-red-50">
    <div class="container m-auto max-w-2xl py-24">
        <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form @submit.prevent="handleSubmit">
                <h2 class="text-3xl text-center font-bold mb-6">Dodaj ogłoszenie</h2>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Marka samochodu</label>
                    <input v-model="form.make" type="text" id="make" name="make"
                        class="border rounded w-full py-2 px-3 mb-2" placeholder="np. Toyota" required/>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Model samochodu</label>
                    <input v-model="form.model" type="text" id="model" name="model"
                        class="border rounded w-full py-2 px-3 mb-2" placeholder="np. Camry" required/>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Opis</label>
                    <textarea v-model="form.description" type="text" id="description" name="description"
                        rows="4" class="border rounded w-full py-2 px-3"></textarea>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Rok produkcji</label>
                    <input v-model="form.year" type="text" id="year" name="year"
                        class="border rounded w-full py-2 px-3 mb-2" placeholder="np. 2015" required/>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Cena</label>
                    <input v-model="form.price" type="text" id="price" name="price"
                        class="border rounded w-full py-2 px-3 mb-2" required/>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Przebieg</label>
                    <input v-model="form.mileage" type="text" id="mileage" name="mileage"
                        class="border rounded w-full py-2 px-3 mb-2" placeholder="np. 180000" required/>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Lokalizacja</label>
                    <input v-model="form.location" type="text" id="location" name="location"
                        class="border rounded w-full py-2 px-3 mb-2" placeholder="np. Kraków, Małopolskie" required/>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Rodzaj paliwa</label>
                    <select v-model="form.fuel" id="fuel" name="fuel"
                        class="border rounded w-full py-2 px-3" required>
                        <option value="Benzyna">Benzyna</option>
                        <option value="Benzyna + LPG">Benzyna + LPG</option>
                        <option value="CNG">CNG</option>
                        <option value="Wodór">Wodór</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybryda">Hybryda</option>
                        <option value="Elektryczny">Elektryczny</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">VIN</label>
                    <input v-model="form.vin" type="text" id="vin" name="vin"
                        class="border rounded w-full py-2 px-3 mb-2" placeholder="np. xxxxxxxxxxxxxxxxx" required/>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Telefon Kontaktowy</label>
                    <input v-model="form.contactPhone" type="text" id="phone" name="phone"
                        class="border rounded w-full py-2 px-3 mb-2" placeholder="np. 111-222-333" required/>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Email</label>
                    <input v-model="form.contactEmail" type="text" id="mail" name="mail"
                        class="border rounded w-full py-2 px-3 mb-2" placeholder="np. abc@gmail.com" required/>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Zdjęcie</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        @change="handleFileChange"
                        class="border rounded w-full py-2 px-3 mb-2" 
                        required
                    />
                    <div v-if="previews.length" class="mt-2 flex flex-wrap gap-2">
                        <div 
                            v-for="(src, index) in previews" 
                            :key="index" 
                            class="border rounded overflow-hidden w-24 h-24"
                        >
                            <img 
                                :src="src" 
                                alt="Podgląd zdjęcia" 
                                class="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    </div>
                

                <div>
                    <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                        type="submit">
                        Dodaj ogłoszenie
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>
</template>
