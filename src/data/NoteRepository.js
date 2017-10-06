import EventEmitter from 'events'
import Firebase from 'firebase'
import Auth from '../data/Auth'
import EventBus from '../components/EventBus'
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
    var path = window.location.pathname.split('/detail/')
    return path[1]
  }
  get noteid() {
    var path = window.location.pathname.split('/')
    return path[3]
  }
  get journalidHistory() {
    var path = window.location.pathname.split('/')
    return path[2]
  }

  get notesRef() {
    return Firebase.database().ref(`users/${this.uid}/journals/${this.journalid}/notes`)
  }
  get notesChildRef(){
    return Firebase.database().ref(`users/${this.uid}/journals/${this.journalid}/notes/${$noteid}/notesrecords`)
  }
  getNotesChildRef($noteKey) {
    return Firebase.database().ref(`users/${this.uid}/journals/${this.journalid}/notes/${$noteKey}/notesrecords`)
  }
  getNotesRef() {
    return this.notesRef;
  }
  getJournalid() {
    return this.journalid;
  }

  getNotesHistory() {
  
    return Firebase.database().ref(`users/${this.uid}/journals/${this.journalidHistory}/notes/${this.noteid}/notesrecords`)
  }


  create({

    title = '',
    content = '',
    created = '',
    hide = false,
    active = true,
    version = 1
  }, onComplete) {
    
    //Create Note对象不要那么多东西
    let note = 
    this.notesRef.push({
      //title,
     // content,
      created,
      hide,
      active
      //version
    }, onComplete)
    //这里才算note里面的内容
    this.getNotesChildRef(note.key).push({
      title,
      content,
      created,
      //hide,
      //active,
      version // 其实version可以拿created代替的....反正都是日期
    }, onComplete)


  }
  updateParent({
    key,
    hide,
    active
  },onComplete)
  {
    this.notesRef.child(key).update({
      hide,
      active
    },onComplete)

  }
  update({
    key,
    title = '',
    content = '',
    created = '',
    hide,
    active,
    version
  }, onComplete) {
   
    created = moment().format('MM/DD/YYYY hh:mm')
    version = parseInt(version) + 1; //自动递增版本号
    //alert("title " +title +"c " + content + " ct" + created + "v" + version++)
    this.getNotesChildRef(key).push({title, content, created, version}, onComplete)
    /*
    this.notesRef.child(key).update({
      title,
      content,
      created,
      hide,
      active,
      version
    }, onComplete) */
    // key is used to find the child, a new note object is made without the key, to prevent key being inserted in Firebase
  
  }
  remove({
    key
  }, onComplete) {
    this.notesRef.child(key).remove(onComplete)
  }


  attachFirebaseListeners() {
    Auth.onAuth((user) => {
      
      this.emit('userAuth', user)
      this.notesRef.on('child_added', this.onAdded, this)
      this.notesRef.on('child_removed', this.onRemoved, this)
      this.notesRef.on('child_changed', this.onChanged, this)
      this.notesChildRef.on('child_added', this.onHistory, this)//历史记录
     
    })
  }

  detachFirebaseListeners() {
    this.notesRef.off('child_added', this.onAdded, this)
    this.notesRef.off('child_removed', this.onRemoved, this)
    this.notesRef.off('child_changed', this.onChanged, this)
    this.notesChildRef.on('child_added', this.onHistory, this)//历史记录
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
  onHistory(snapshot) {
    alert("OK");
    let note = this.snapshotToNote(snapshot)
    this.emit('history', note)
  }
  
  onError(err) {
    console.log(err)
  }
  // processes the snapshots to consistent note with key
  snapshotToNote(snapshot) {
    /*
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
    */
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
      note.version = bbb.val().version

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
