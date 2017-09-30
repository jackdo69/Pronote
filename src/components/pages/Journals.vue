<template>
<div class="container">
  <journals></journals>
  <update-modal></update-modal>
</div>
</template>
<script>
import * as firebase from "firebase";
import journals from 'src/components/journals/Index';
import UpdateModal from 'src/components/journals/UpdateModal';

export default {
  components: {
    journals,
    // CreatejournalForm,
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
