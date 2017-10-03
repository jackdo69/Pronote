import EventEmitter from 'events'
import Firebase from 'firebase'
import Auth from '../data/Auth'
import moment from 'moment'
class NoteRepository extends EventEmitter {
  constructor() {
    super()
    this.ref = Firebase.database().ref('notes')
  }
  get uid() {
    let user = Firebase.auth().currentUser
    if (user) {
      return user.uid
    }
    return null
  }

  get journalid() {
    //return Firebase.database().ref.parent().key();
    //return this.$route.params.id

      var path = window.location.pathname.split('/detail/')
      return path[1]

  }

  get notesRef() {
    // return Firebase.database().ref(`users/${this.uid}/notes`)
    return Firebase.database().ref(`users/${this.uid}/journals/${this.journalid}/notes`)
  }


  getJournalid (){
      return this.journalid;
  }
  getNoteid(){
    //
  }
  create ({title = '', content = '', created = ''}, onComplete) {
    let note = this.notesRef.push({created}, onComplete)
    //alert(note.key)
    Firebase.database().ref(`users/${this.uid}/journals/${this.journalid}/notes/${note.key}/notesrecords`).push({title, content, created}, onComplete)

  }
  update ({key, title = '', content = '', created = ''}, onComplete) {
    //this.notesRef.child(key).update({title, content, created}, onComplete) // key is used to find the child, a new note object is made without the key, to prevent key being inserted in Firebase
    //this.notesRef.push({title, content, created}, onComplete) //history
    //alert(key)
    created = moment().format('MM/DD/YYYY hh:mm')
    Firebase.database().ref(`users/${this.uid}/journals/${this.journalid}/notes/${key}/notesrecords`).push({title, content, created}, onComplete)
    //this.notesRecordRef.push({title, content, created}, onComplete)

  }
  remove ({key}, onComplete) {

    this.notesRef.child(key).remove(onComplete)
  }

  attachFirebaseListeners() {
    Auth.onAuth((user) => {
      this.emit('userAuth', user)
      this.notesRef.on('child_added', this.onAdded, this)
      this.notesRef.on('child_removed', this.onRemoved, this)
      this.notesRef.on('child_changed', this.onChanged, this)
    })
  }

  detachFirebaseListeners() {
    this.notesRef.off('child_added', this.onAdded, this)
    this.notesRef.off('child_removed', this.onRemoved, this)
    this.notesRef.off('child_changed', this.onChanged, this)
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
    
    var aa = this.notesRef.child(key+"/notesrecords").orderByKey();

    aa.on('child_added', function(bbb) {
      //alert(bbb.val().title)
      note.title = bbb.val().title //显示标题，todo 显示内容
      note.created = bbb.val().created
      note.content = bbb.val().content
      

    });
  
  
    //note.title = snapshot.child("notesrecords/").val()
    //alert(snapshot.val())
    return note
  }
  // Finds the index of the note inside the array by looking for its key
  findIndex(notes, key) {
    return notes.findIndex(note => note.key === key)
  }
  // Finds the note inside the array by looking for its key
  find(notes, key) {
    return notes.find(note => note.key === key)

    //return notes.find(note => notesrecord => notesrecords.key ==key)


  }
}
export default new NoteRepository() // this instance will be shared across imports