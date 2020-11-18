import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import FacetedSearch from '../views/FacetedSearch.vue'
import MovieForm from '../views/MovieForm.vue'
import Configure from '../views/Configure.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/movies/:id',
    name: 'MovieForm',
    component: MovieForm
  }  
  ,{
    path: '/',
    name: 'Home',
    component: Search
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/faceted-search',
    name: 'FacetedSearch',
    component: FacetedSearch
  },
  {
    path: '/configure',
    name: 'Configure',
    component: Configure
  },  
  ]

const router = new VueRouter({
  routes
})

export default router
