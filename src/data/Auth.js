import Firebase from 'firebase'
// Initialize Firebase
let config = require('./config.json')
Firebase.initializeApp(config)
export default {
  ref: Firebase.auth(),
  onAuth(authCallback) {
    this.ref.onAuthStateChanged(authCallback)
  },
  getAuth() {
    return this.ref.currentUser
  },
  loginWithPassword(credentials) {
    return this.ref.signInWithEmailAndPassword(credentials.email, credentials.password)
  },
  signUpWithPassword(credentials) {
    return this.ref.createUserWithEmailAndPassword(credentials.email, credentials.password)
  },
  signOut() {
    this.ref.signOut()
  }
}
