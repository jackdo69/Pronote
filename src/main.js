import Vue from 'vue'
import App from './App'
import Auth from './data/Auth'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
import AuthPage from './components/pages/Auth'
import JournalsPage from './components/pages/Journals'
import JournalDetailsPage from './components/pages/JournalDetails'
import NoteHistoryPage from './components/notes/NoteHistory'
import ArchivedPage from './components/pages/ArchivedPage'
import * as firebase from "firebase";
Vue.use(VueRouter)
Vue.use(VueFire)
const router = new VueRouter({
  mode: 'history',
  routes: [{
      name: 'index',
      path: '',
      component: JournalsPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: '/detail/:id',
      path: '/detail/:id',
      component: JournalDetailsPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: '/detail/:id/:note_id/history',
      path: '/detail/:id/:note_id/history',
      component: NoteHistoryPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'home',
      path: '/home',
      component: JournalsPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'auth',
      path: '/auth',
      component: AuthPage
    },
    {
      name: 'archived',
      path: '/archived',
      component: ArchivedPage,
      meta: {
        requiresAuth: true
      }
    },
  ]
})


router.beforeEach((to, from, next) => {
  console.log("checkAuth():");
  firebase.auth().onAuthStateChanged(function(user) {
    if (to.matched.some(record => record.meta.requiresAuth) && !user) {
      next({
        path: '/auth',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  });

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  },
  router: router
})