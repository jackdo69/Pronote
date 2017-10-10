<template>
<div class="container">
  <create-journal-form></create-journal-form>
  <div class="journals" ref="journals">
  	<journals></journals>
	</div>
  <update-modal></update-modal>
</div>
</template>
<script>
import * as firebase from "firebase";
import CreateJournalForm from 'src/components/journals/Create'
import Journals from 'src/components/journals/Index';
import UpdateModal from 'src/components/journals/UpdateModal';
import Masonry from 'masonry-layout'

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
  watch: {
    'journals': {
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
	  this.masonry = new Masonry(this.$refs.journals, {
	      itemSelector: '.note',
	      columnWidth: 320,
	      gutter: 16,
	      fitWidth: false
	    })
  },
  created() {

  },
  methods: {

  }
}
</script>
