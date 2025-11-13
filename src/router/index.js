import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/Views/HomeView.vue'
import ListingView from '@/components/Views/ListingView.vue'
import AddListingView from '@/components/Views/AddListingView.vue'
import ListingsView from '@/components/Views/ListingsView.vue'
import EditListingView from '@/components/Views/EditListingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/listings/:id',
      name: 'listing',
      component: ListingView
    },
    {
      path: '/listings/add',
      name: 'listings-add',
      component: AddListingView
    },
    {
      path: '/listings',
      name: 'listings',
      component: ListingsView
    },
    {
      path: '/listings/:id/edit',
      name: 'listings-edit',
      component: EditListingView
    }
  ],
})

export default router
