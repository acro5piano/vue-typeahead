import Vue from 'vue'
import Router from 'vue-router'
import Prefecture from '@/components/Prefecture'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Prefecture
    }
  ]
})
