<template>
<div class="container">
  <h3 class="text-center">Archived</h3>
  <div class="notes" ref="notes">
  <div v-for="note in notes" :note="note">
    <div class="note" v-if="note.active == true">
      <h2 class="text-primary"><i class="fa fa-sticky-note" aria-hidden="true">&nbsp;{{note.title}}</i></h2>
      <div class="text-right text-default">{{note.created}}</div>
      <pre>{{note.content}}</pre>
      <div class="text-left text-default">Version: {{note.version}}</div>
    </div>
  </div>
  </div>
</div>
</template>
<script>
import archivedNoteRepository from '../../data/ArchivedNoteRepository'
import EventBus from '../../components/EventBus'
import Masonry from 'masonry-layout'
export default {
  data() {
    return {
      notes: []
    }
  },
  watch: {
    'notes': {
      handler() {
        this.$nextTick(() => {
          this.masonry.reloadItems()
          this.masonry.layout()
        })
      }
    },
    deep: true
  },
  mounted() {
	  this.masonry = new Masonry(this.$refs.notes, {
	      itemSelector: '.note',
	      columnWidth: 320,
	      gutter: 16,
	      fitWidth: false
	    })
  },
  created() {
    this.$bindAsArray('notes', archivedNoteRepository.getNotesRef());
  }
}
</script>
