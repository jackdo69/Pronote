import EventEmitter from 'events'
import Firebase from 'firebase'
import Auth from '../data/Auth'

class JournalRepository extends EventEmitter {
  constructor () {
    super()
    this.ref = Firebase.database().ref('journals')
  }
  get uid () {
    let user = Firebase.auth().currentUser
    if (user) {
      return user.uid
    }
    return null
  }

  get journalid () {
    return this.key
  }

  get journalsRef () {
    return Firebase.database().ref(`users/${this.uid}/journals`)
  }
  create ({title = '', content = ''}, onComplete) {
    this.journalsRef.push({title, content}, onComplete)
  }
  update ({key, title = '', content = ''}, onComplete) {
    this.journalsRef.child(key).update({title, content}, onComplete) // key is used to find the child, a new journal object is made without the key, to prevent key being inserted in Firebase
  }
  remove ({key}, onComplete) {
    this.journalsRef.child(key).remove(onComplete)
  }
  attachFirebaseListeners () {
    Auth.onAuth((user) => {
      this.emit('userAuth', user)
      this.journalsRef.on('child_added', this.onAdded, this)
      this.journalsRef.on('child_removed', this.onRemoved, this)
      this.journalsRef.on('child_changed', this.onChanged, this)
    })
  }

  detachFirebaseListeners () {
    this.journalsRef.off('child_added', this.onAdded, this)
    this.journalsRef.off('child_removed', this.onRemoved, this)
    this.journalsRef.off('child_changed', this.onChanged, this)
  }
  onAdded (snapshot) {
    let journal = this.snapshotTojournal(snapshot)
    // propagate event outwards with journal
    this.emit('added', journal)
  }
  onRemoved (oldSnapshot) {
    let journal = this.snapshotTojournal(oldSnapshot)
    this.emit('removed', journal)
  }
  onChanged (snapshot) {
    let journal = this.snapshotTojournal(snapshot)
    this.emit('changed', journal)
  }
  onError (err) {
    console.log(err)
  }
  // processes the snapshots to consistent journal with key
  snapshotTojournal (snapshot) {
    // we will need the key often, so we always want to have the key included in the journal
    let key = snapshot.key
    let journal = snapshot.val()
    journal.key = key
    return journal
  }
  // Finds the index of the journal inside the array by looking for its key
  findIndex (journals, key) {
    return journals.findIndex(journal => journal.key === key)
  }
  // Finds the journal inside the array by looking for its key
  find (journals, key) {
    return journals.find(journal => journal.key === key)
  }
}
export default new JournalRepository() // this instance will be shared across imports
