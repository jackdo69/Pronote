// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App2 from './App2'
import Auth from './data/Auth'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
// import NotesPage from './components/pages/Notes'
import AuthPage from './components/pages/Auth'
import JournalsPage from './components/pages/Journals'
import JournalDetailsPage from './components/pages/JournalDetails'
import * as firebase from "firebase";

Vue.use(VueRouter)
Vue.use(VueFire)
const router = new VueRouter({
    mode : 'history',
  routes: [
    // { name: 'notes', path: '/detail/:id', component: JournalDetailsPage,
    // alias: '/notes', meta: { auth: true } },
      { name: 'index', path: '', component: JournalsPage, meta: { requiresAuth: true } },
      { name: '/detail/:id', path: '/detail/:id', component: JournalDetailsPage , meta: { requiresAuth: true }},
    { name: 'home', path: '/home', component: JournalsPage, meta: { requiresAuth: true } },
    { name: 'auth', path: '/auth', component: AuthPage }
  ]
})


router.beforeEach((to, from, next) => {
    console.log("checkAuth():");
    firebase.auth().onAuthStateChanged(function(user) {
        if (to.matched.some(record => record.meta.requiresAuth) && !user) {
            next({ path: '/auth', query: { redirect: to.fullPath }});
          } else {
            next();
          }
      });

})

/* eslint-disable no-new */
new Vue({
  el: '#app2',
  template: '<App2/>',
  components: { App2 },
  router: router
})
