<template>
<div class="container">
  <h3 class="text-center">Archived</h3>
  <div v-for="note in notes" :note="note">

    <div class="note" v-if="note.active == true">
      <h2 class="text-primary"><i class="fa fa-sticky-note" aria-hidden="true">&nbsp;{{note.title}}</i></h2>
      <div class="text-right text-default">{{note.created}}</div>
      <pre>{{note.content}}</pre>
      <div class="text-left text-default">Version: {{note.version}}</div>
    </div>
  </div>
</div>
</template>
<script>
import archivedRepository from '../../data/ArchivedRepository'
import EventBus from '../../components/EventBus'

export default {
  data() {
    return {
      notes: []
    }
  },
  methods: {

  },
  created() {
    this.$bindAsArray('notes', archivedRepository.getNotesRef());
  }
}
</script>
