import EventEmitter from 'events'
import Firebase from 'firebase'
import Auth from '../data/Auth'

class NoteRepository extends EventEmitter {
  constructor() {
    super()
    this.ref = Firebase.database().ref('archived')
  }
  get uid() {
    let user = Firebase.auth().currentUser
    if (user) {
      return user.uid
    }
    return null
  }


  get archivedRef() {
    return Firebase.database().ref(`users/${this.uid}/archived`)
  }
  getNotesRef() {
    return this.archivedRef;
  }
  getJournalid() {
    return this.journalid;
  }
  create({
    title = '',
    content = '',
    created = '',
    active = true,
    version = 1
  }, onComplete) {
    this.archivedRef.push({
      title,
      content,
      created,
      active,
      version
    }, onComplete)
  }
  // update ({key, title = '', content = '', created = '', active, version}, onComplete) {
  // this.archivedRef.child(key).update({title, content, created, active , version}, onComplete) // key is used to find the child, a new note object is made without the key, to prevent key being inserted in Firebase
  // }
  remove({
    key
  }, onComplete) {
    this.archivedRef.child(key).remove(onComplete)
  }

  attachFirebaseListeners() {
    Auth.onAuth((user) => {
      this.emit('userAuth', user)
      this.archivedRef.on('child_added', this.onAdded, this)
      this.archivedRef.on('child_removed', this.onRemoved, this)
      this.archivedRef.on('child_changed', this.onChanged, this)
    })
  }

  detachFirebaseListeners() {
    this.archivedRef.off('child_added', this.onAdded, this)
    this.archivedRef.off('child_removed', this.onRemoved, this)
    this.archivedRef.off('child_changed', this.onChanged, this)
  }
  onAdded(snapshot) {
    let note = this.snapshotToNote(snapshot)
    // propagate event outwards with note
    this.emit('added', note)
  }
  onRemoved(oldSnapshot) {
    let note = this.snapshotToNote(oldSnapshot)
    this.emit('removed', note)
  }
  onChanged(snapshot) {
    let note = this.snapshotToNote(snapshot)
    this.emit('changed', note)
  }
  onError(err) {
    console.log(err)
  }
  // processes the snapshots to consistent note with key
  snapshotToNote(snapshot) {
    // we will need the key often, so we always want to have the key included in the note
    let key = snapshot.key
    let note = snapshot.val()
    note.key = key
    return note
  }
  // Finds the index of the note inside the array by looking for its key
  findIndex(archived, key) {
    return archived.findIndex(note => note.key === key)
  }
  // Finds the note inside the array by looking for its key
  find(archived, key) {
    return archived.find(note => note.key === key)
  }
}
export default new NoteRepository() // this instance will be shared across imports