<template>
<div class="container">
  <create-journal-form></create-journal-form>
  <journals></journals>
  <update-modal></update-modal>
</div>
</template>
<script>
import * as firebase from "firebase";
import CreateJournalForm from 'src/components/journals/Create'
import Journals from 'src/components/journals/Index';
import UpdateModal from 'src/components/journals/UpdateModal';

export default {
  components: {
    CreateJournalForm,
    Journals,
    UpdateModal
  },
  data() {
    return {
      selectedjournal: null
    }
  },
  events: {
    'journal.selected': function(journal) {
      this.selectedjournal = journal
    }
  },
  created() {

  },
  methods: {

  }
}
</script>
