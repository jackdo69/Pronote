// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Auth from './data/Auth'
import App2 from './App2'
import VueRouter from 'vue-router'
import AuthPage from './components/pages/Auth'
import JournalsPage from './components/pages/Journals'
import JournalDetailsPage from './components/pages/JournalDetails'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { name: 'home', path: '/', component: JournalsPage, alias: '/journals', meta: { auth: true } },
    { name: 'detail', path: '/detail/:id', component: JournalDetailsPage },
    { name: 'auth', path: '/auth', component: AuthPage }
  ]
})
router.beforeEach((to, from, next) => {
  if (Auth.userData) { next() }
  if (to.meta.auth && !Auth.getAuth()) {
    next({name: 'auth'})
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app2',
  template: '<App2/>',
  components: { App2 },
  router: router
})
