<template>
<div class="container">
  <h3 class="text-center">Journal: <span class="text-danger">{{journal_title}}</span></h3>
  <h4 class="text-center">Create a journal entry</h4>
  <form class="create-note" v-on:submit.prevent="createNote()">
    <input name="title" v-model="title" v-validate="'required|min:1'" placeholder="Enter entry title."/>
	<input name="created" v-model="created" type="hidden"/>
	<input name="version" v-model="version" type="hidden"/>
	<input name="created" v-model="created" type="hidden"/>
    <textarea name="content" v-model="content" placeholder="Enter content here." rows="3">
    </textarea>
    <button type="submit">+</button>
  </form>
 </div>
</template>
<script>
  import noteRepository from '../../data/NoteRepository';
  import journalRepository from '../../data/JournalRepository';
  import moment from 'moment'
  import EventBus from '../../components/EventBus'

  export default {
    data () {
      return {
    	  journals: [],
        title: '',
        content: '',
        created: moment().format('MM/DD/YYYY hh:mm'),
        active: true,
        version: 1,
        journal_title: ''
      }
    },
    created() {
    	this.created = moment().format('MM/DD/YYYY hh:mm');
    	const id = noteRepository.getJournalid();
    	var journalsRef = journalRepository.getJournalsRef();
    	journalsRef.child(id)
	    .once('value')
	    .then((snapshot) => {
			  var value = snapshot.val();
			  this.journal_title = value.title;
			});
	},
    methods: {
      createNote () {
        if (this.title.length < 1) {
          alert('Please enter entry title')
        } else if (this.title.trim() || this.content.trim()) {
          noteRepository.create({
            title: this.title,
            content: this.content,
            created: this.created,
            active: this.active,
            version: this.version
          }, (err) => {
            if (err) {
              return EventBus.$emit('alert', {type: 'error', message: err.message})
            }
            this.title = '';
            this.content = '';
            this.created =  moment().format('MM/DD/YYYY hh:mm');
            this.active = true;
            this.version= 1;
            EventBus.$emit('alert', {type: 'success', message: 'Note was successfully created'})
          })
        }
        // if (this.title.trim() || this.content.trim()) {
        //   noteRepository.create({
        // 	  title: this.title,
        // 	  content: this.content,
        // 	  created: this.created,
        // 	  active: this.active,
        // 	  version: this.version
        //   }, (err) => {
        //     if (err) {
        //       return EventBus.$emit('alert', {type: 'error', message: err.message})
        //     }
        //     this.title = '';
        //     this.content = '';
        //     this.created =  moment().format('MM/DD/YYYY hh:mm');
        //     this.active = true;
        //     this.version= 1;
        //     EventBus.$emit('alert', {type: 'success', message: 'Note was successfully created'})
        //   })
        // }
      }
    }
  }
</script>

<style>
  form.create-note{
    position: relative;
    width: 480px;
    margin: 25px auto 15px auto;
    background: #fff;
    padding: 15px;
    border-radius: 2px;
    box-shadow: 0 1px 5px #ccc;
  }
  form.create-note input, form.create-note textarea{
    width: 100%;
    border: none;
    padding: 4px;
    outline: none;
    font-size: 1.2em;
  }
  form.create-note button{
    position: absolute;
    right: 18px;
    bottom: -18px;
    background: #41b883;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    cursor: pointer;
    outline: none;
  }

  p {
    font-family: Arial,Helvetica,sans-serif;
  }
</style>
