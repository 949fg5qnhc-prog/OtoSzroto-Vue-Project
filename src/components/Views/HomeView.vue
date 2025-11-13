<script setup>
import MainPage from '@/components/MainPage.vue'
import Homecards from '@/components/Homecards.vue'
import Listings from '@/components/Listings.vue'
import SearchBar from '@/components/SearchBar.vue'
</script>

<template>
    <MainPage />
    <SearchBar />
    <Homecards />
    <Listings limit = '3'/>
</template>