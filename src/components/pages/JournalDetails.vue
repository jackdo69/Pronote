<template>
  <div>
    <create-note-form></create-note-form>
    <notes></notes>
    <update-modal></update-modal>
  </div>
</template>
<script>
  import Auth from 'src/data/Auth'
  import Notes from 'src/components/notes/Index'
  import CreateNoteForm from 'src/components/notes/Create'
  import UpdateModal from 'src/components/notes/UpdateModal'
  export default {
    components: {
      Notes,
      CreateNoteForm,
      UpdateModal
    },

    methods: {
      processUser (authed) {
        if (authed === null) {
          this.user = null
          return
        }
        this.user = {
          userTitle: authed.providerData[0].displayName || authed.providerData[0].email || '', // if there's no displayName, take the email, if there's no email, use an empty string
          imageUrl: authed.providerData[0].photoURL || 'https://www.gravatar.com/avatar/' // Firebase 3 no longer supports auto Gravatar image fetch
        }
      },
      signOut () {
        Auth.signOut()
        this.$router.push('auth')
      }
    },

    created () {
      Auth.onAuth(this.processUser) // processUser everytime auth state changes (signs in or out)
      this.processUser(Auth.getAuth()) // processUser in case user is already signed in
    },

    data () {
      return {
        selectedNote: null
      }
    },
    events: {
      'note.selected': function (note) {
        this.selectedNote = note
      }
    }
  }
</script>
