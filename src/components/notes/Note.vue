<template>
<div class="note" v-if="note.active == true">
	<h2 class="text-primary">
		<i class="fa fa-sticky-note" aria-hidden="true">&nbsp;{{note.title}}</i>
	</h2>
	<div class="text-right text-default">{{note.created}}</div>
	<pre>{{note.content}}</pre>

	<div class="text-default">
		Version: {{note.version}} <a id="lb_history" href="javascript:;" @click="viewHistory(note)">View History</a>
	</div>

	<button type="button" v-on:click.stop="moveArchive">
		<i class="fa fa-archive text-danger" aria-hidden="true"></i>
	</button>
	<button type="button" v-if="note.hide != true" v-on:click.stop="hide">
		<i class="fa fa-eye-slash" aria-hidden="true"></i>
	</button>
	<button type="button" v-if="note.hide == true" v-on:click.stop="unhide">
		<i class="fa fa-eye" aria-hidden="true"></i>
	</button>
	<button class="edit" type="button" @click="updateModal">
		<i class="fa fa-pencil text-primary" aria-hidden="true"></i>
	</button>
</div>
</template>
<script>
import noteRepository from '../../data/NoteRepository'
import archivedNoteRepository from '../../data/ArchivedNoteRepository'
import EventBus from '../EventBus'

export default {
  props: ['note'],
  methods: {
    viewHistory: function(note) {

      var path = window.location.pathname.split('/detail/')
      //alert("key "+ path[1])
      this.$router.push({
        name: '/detail/:id/:note_id/history',
        params: {
          id: path[1],
          note_id: note.key
        }
      })
    },
    moveArchive() {
      archivedNoteRepository.create(this.note, (err) => {
        // alert('error occur')
      })

      noteRepository.remove(this.note, (err) => {
        // alert('error occur')
      })
    },
    updateModal() {

      console.log("updateModal");
      console.log(this.note);
      EventBus.$emit('note.selected', this.note)
    },

    hide() {
      console.log('hide')
      var notesRef = noteRepository.getNotesRef();
      notesRef.child(this.note.key).once('value')
        .then((snapshot) => {
          var oldnote = snapshot.val();
          console.log('oldnote:')
          console.log(oldnote)
          oldnote = this.note;
          console.log(oldnote)
          oldnote.key = this.note.key;
          oldnote.hide = true;
          noteRepository.updateParent(this.note, (err) => {})
        });
    },

    unhide() {
      console.log('unhide' + this.note.key)
      var notesRef = noteRepository.getNotesRef();
      notesRef.child(this.note.key).once('value')
        .then((snapshot) => {
          var oldnote = snapshot.val();
          console.log('unhide oldnote:')
          console.log(oldnote)
          oldnote = this.note;
          console.log(oldnote)
          oldnote.key = this.note.key;
          oldnote.hide = false;
          noteRepository.updateParent(this.note, (err) => {})
        });
    }
  }
}
</script>

<style>
#lb_history {
	float: right;
}

.note {
	background: #fff;
	border-radius: 3px;
	box-shadow: 0 2px 10px #ccc;
	padding: 16px;
	width: 320px;
	margin: 16px 0;
}

.note h2 {
	/*font-size: 1.1em;*/
	margin-bottom: 8px;
}

.note pre {
	font-size: 1.1em;
	margin-bottom: 10px;
	white-space: pre-wrap;
	word-wrap: break-word;
	font-family: inherit;
}

.note button {
	background: none;
	border: none;
	font-size: 20px;
	opacity: 0;
	cursor: pointer;
	transition: opacity .5s;
	margin: 0 4px 0 0;
}

.note button.edit {
	float: right;
}

.note:hover, .note:focus {
	box-shadow: 0 1px 8px #797979;
}

.note:hover button, .note:focus button {
	opacity: 0.6;
}
</style>
