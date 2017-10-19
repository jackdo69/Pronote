<template>
<div class="container">
  <h1 class="text-center">{{this.username}}'s Journals</h1>
  <h4 class="text-center">Create a journal</h4>
  <create-journal-form></create-journal-form>
  <div class="journals" ref="journals">
  	<journals></journals>
	</div>
  <update-modal></update-modal>
</div>
</template>
<script>
import Auth from 'src/data/Auth'
import * as firebase from "firebase";
let db = firebase.database();
let usersRef = db.ref('users');
import CreateJournalForm from 'src/components/journals/Create'
import Journals from 'src/components/journals/Index';
import UpdateModal from 'src/components/journals/UpdateModal';
import Masonry from 'masonry-layout'

export default {
  components: {
    CreateJournalForm,
    Journals,
    UpdateModal
  },
  data() {
    return {
      selectedjournal: null,
      username:''
    }
  },
  events: {
    'journal.selected': function(journal) {
      this.selectedjournal = journal
    }
  },
  watch: {
    'journals': {
      handler() {
        this.$nextTick(() => {
          this.masonry.reloadItems()
          this.masonry.layout()
        })
      }
    },
    deep: true
  },
  mounted() {
	  this.masonry = new Masonry(this.$refs.journals, {
	      itemSelector: '.note',
	      columnWidth: 320,
	      gutter: 16,
	      fitWidth: false
	    })
  },
  created() {
    Auth.onAuth(this.processUser) // processUser everytime auth state changes
    // (signs in or out)
    this.processUser(Auth.getAuth()) // processUser in case user is already
  // signed in
  },
  methods: {
    processUser (authed) {
      if (authed === null) {
        this.user = null
        return
      }
      var userTitle = authed.providerData[0].displayName || authed.providerData[0].email || '';
      var uid = firebase.auth().currentUser.uid;
      usersRef.child(uid)
        .once('value')
        .then((snapshot) => {
          var value = snapshot.val();
          console.log("value:");
          console.log(value);
          if (value) {
            if(value.username){
              this.username = value.username;
            }else{
              this.username = user.userTitle;
            }
          }else{
            this.username = userTitle;
          }
          console.log("username:" + this.username);
        });

      this.user = {
        userTitle : userTitle,
        imageUrl : authed.providerData[0].photoURL || 'https://firebase.google.com/_static/images/firebase/touchicon-180.png'
      }
    }
  }
}
</script>
