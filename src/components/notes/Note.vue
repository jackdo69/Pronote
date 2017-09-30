<template>
<div class="note" v-if="note.active == true">
  <h2 class="text-primary"><i class="fa fa-sticky-note" aria-hidden="true">&nbsp;{{note.title}}</i></h2>
  <div class="text-right text-default">{{note.created}}</div>
  <pre>{{note.content}}</pre>
  <div class="text-left text-default">Version: {{note.version}}</div>
  <button type="button" v-on:click.stop="moveArchive">
      <i class="fa fa-archive text-danger" aria-hidden="true"></i>
    </button>
  <button class="edit" type="button" @click="updateModal">
    <i class="fa fa-pencil text-primary" aria-hidden="true"></i>
    </button>
</div>
</template>
<script>
import noteRepository from '../../data/NoteRepository'
import archivedRepository from '../../data/ArchivedRepository'
import EventBus from '../EventBus'

export default {
  props: ['note'],
  methods: {
    moveArchive() {
      //console.log("journal_title:" + this.$els.journal_title);
      archivedRepository.create(this.note, (err) => {
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
