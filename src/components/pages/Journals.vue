<template>
  <div>
    <!-- <create-journal-form></create-journal-form> -->
    <journals></journals>
    <update-modal></update-modal>
  </div>
</template>
<script>
  import journals from 'src/components/journals/Index'
  // import CreatejournalForm from 'src/components/journals/Create'
  import UpdateModal from 'src/components/journals/UpdateModal'
  export default {
    components: {
      journals,
      // CreatejournalForm,
      UpdateModal
    },
    data () {
      return {
        selectedjournal: null
      }
    },
    events: {
      'journal.selected': function (journal) {
        this.selectedjournal = journal
      }
    }
  }
</script>
