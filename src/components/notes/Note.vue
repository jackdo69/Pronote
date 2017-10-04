<template>
<div class="note" v-if="note.active == true">
  <h2 class="text-primary"><i class="fa fa-sticky-note" aria-hidden="true">&nbsp;{{note.title}}</i></h2>
  <div class="text-right text-default">{{note.created}}</div>
  <pre>{{note.content}}</pre>
  <div class="text-left text-default">Version: {{note.version}}</div>
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

<<<<<<< HEAD
export default {
  props: ['note'],
  methods: {
    moveArchive() {
      archivedNoteRepository.create(this.note, (err) => {
        alert('error occur')
      })

      noteRepository.remove(this.note, (err) => {
        alert('error occur')
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
          oldnote.key = this.note.key;
          oldnote.hide = true;
          noteRepository.update(oldnote, (err) => {})
        });
    },

    unhide() {
      console.log('unhide' + this.note.key)
      var notesRef = noteRepository.getNotesRef();
      notesRef.child(this.note.key).once('value')
        .then((snapshot) => {
          var oldnote = snapshot.val();
          oldnote.key = this.note.key;
          oldnote.hide = false;
          noteRepository.update(oldnote, (err) => {})
        });
=======

  export default {
    props: ['note'],
    methods: {
      remove () {
        noteRepository.remove(this.note, (err) => {
          if (err) {
            EventBus.$emit('alert', {type: 'error', message: err.message})
          }
        })
      },
      updateModal () {
        EventBus.$emit('note.selected', this.note)
        //alert(this.note.key)
      }

>>>>>>> a775eefbd9c7e8e5300a96725a3a671ffe9d9415
    }
  }
}
</script>

<style>
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

.note:hover,
.note:focus {
  box-shadow: 0 1px 8px #797979;
}

.note:hover button,
.note:focus button {
  opacity: 0.6;
}
</style>
