<template>
<div class="container">
  <button type="button" class="btn btn-danger" v-show="show_hidden==false" v-on:click="show_hidden=true">Show hidden entries</button>
  <button type="button" class="btn btn-success" v-show="show_hidden==true" v-on:click="show_hidden=false">Show unhidden entries</button>
  <div class="notes" ref="notes">
    <note v-for="note in filteredNotes" v-show="show_hidden==false" v-if="note.hide != true" :note="note">
    </note>
  </div>
  <div class="notes" ref="notes">
    <note v-for="note in filteredNotes" v-show="show_hidden==true" v-if="note.hide ==true" :note="note">
    </note>
  </div>
</div>
</template>
<script>
import noteRepository from '../../data/NoteRepository'
import Masonry from 'masonry-layout'
import EventBus from '../../components/EventBus'
import Note from './Note'
import moment from 'moment'
export default {
  components: {
    Note
  },
  data() {
    return {
      notes: [],
      show_hidden: false,
      searchQuery: '',
      dateRange: '',
      created: moment().format('MM/DD/YYYY hh:mm')
    }
  },
  watch: {
    'filteredNotes': {
      handler() {
        this.$nextTick(() => {
          this.masonry.reloadItems()
          this.masonry.layout()
        })
      }
    },
    deep: true
  },
  computed: {
    filteredNotes() {
      var note_created = '';
      return this.notes.filter((note) => {
        var startDate = this.dateRange[0];
        var endDate = this.dateRange[1];

        if (startDate && endDate) {
          var createdCheck = moment(note.created).format('YYYY-MM-DD');
          startDate = moment(this.dateRange[0]).format('YYYY-MM-DD');
          endDate = moment(this.dateRange[1]).format('YYYY-MM-DD');
          console.log("createdCheck:" + createdCheck);
          if ((createdCheck > startDate) && (createdCheck < endDate)) {
            note_created = moment(note.created).format('MM/DD/YYYY');
          }
          console.log("startDate:" + startDate);
          console.log("note_created:" + note_created);
          console.log("endDate:" + endDate);
        }
        if (this.searchQuery) {
          if (note_created)
            return (note.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1 || note.content.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1 || note.created.indexOf(note_created) !== -1)
          else
            return (note.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1 || note.content.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1)
        } else {
          if (startDate && endDate) {
            return (note.created.indexOf(note_created) !== -1);
          }
        }
        return true
      })
    }
  },
  mounted() {
    this.masonry = new Masonry(this.$refs.notes, {
      itemSelector: '.note',
      columnWidth: 320,
      gutter: 16,
      fitWidth: false
    })

    noteRepository.on('added', (note) => {
      console.log("note added");
      this.notes.unshift(note)
    })
    //Auto update the note added
    noteRepository.on('changed', ({
      key,
      title,
      content,
      created
    }) => {
      console.log("note changed");
      let outdatedNote = noteRepository.find(this.notes, key)
      outdatedNote.title = title
      outdatedNote.content = content
      outdatedNote.created = moment().format('MM/DD/YYYY hh:mm')
      console.log("remove old note");
      this.notes.splice(outdatedNote, 1)
    })
    //Auto update any change done to the note
    noteRepository.on('removed', ({
      key
    }) => {
      let noteToRemove = noteRepository.findIndex(this.notes, key)
      this.notes.splice(noteToRemove, 1)
    })
    //Auto update any note that been removed
    EventBus.$on('search', (searchQuery, dateRange) => {
      this.searchQuery = searchQuery;
      this.dateRange = dateRange;
    })
    noteRepository.attachFirebaseListeners()
  },
  updated() {
    this.$nextTick(() => {
      this.masonry.reloadItems()
      this.masonry.layout()
    })
  },
  destroyed() {
    noteRepository.detachFirebaseListeners()
    this.notes = []
  }
}
</script>
<style>
.notes {
  margin: 0px
}
</style>
