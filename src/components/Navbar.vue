<script setup>
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import 'primeicons/primeicons.css';


const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
}

</script>

<template>
    <nav class="bg-red-700 border-b border-red-500">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
          <div
            class="flex flex-1 items-left justify-left md:items-stretch md:justify-start"
          >
            <div class="md:ml-auto">
              <div class="flex space-x-2">
                <i class="pi pi-car" style="font-size: 2rem"></i>
                <RouterLink
                  to="/"
                  :class="[isActiveLink('/') ? 'bg-red-900' : 'hover:bg-gray-900 hover:text-white', 'text-white', 'px-3', 'py-2', 'rounded-md']"
                  >Strona główna</RouterLink>
                <RouterLink
                  to="/listings"
                  :class="[isActiveLink('/listings') ? 'bg-red-900' : 'hover:bg-gray-900 hover:text-white', 'text-white', 'px-3', 'py-2', 'rounded-md']"
                  >Ogloszenia</RouterLink>
                <RouterLink
                  to="/listings/add"
                  :class="[isActiveLink('/listings/add') ? 'bg-red-900' : 'hover:bg-gray-900 hover:text-white', 'text-white', 'px-3', 'py-2', 'rounded-md']"
                  >Dodaj ogłoszenia</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
</template>