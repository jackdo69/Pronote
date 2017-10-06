<template>
<div class="container">
  <h3 class="text-center">Note History</h3>
    

    <div v-for="note in notes" :note="note">
    
      <h2 class="text-primary"><i class="fa fa-sticky-note" aria-hidden="true">&nbsp;{{note.title}}</i></h2>
      <div class="text-right text-default">{{note.created}}</div>
      <pre>{{note.content}}</pre>
      <div class="text-left text-default">Version: {{note.version}}</div>
   
  </div>

</div>
</template>
<script>
import noteRepository from '../../data/NoteRepository'

import EventBus from '../../components/EventBus'

export default {

  data() {
    return {
      notes: []
      
    }
  },
 created() {
   
    this.$bindAsArray('notes', noteRepository.getNotesHistory());
  }
}
</script>
<style>
.notes {
  margin: 0px
}
</style>
