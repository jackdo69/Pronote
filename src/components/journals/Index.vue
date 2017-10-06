<template>
<div>
  <div class="journals" ref="journals">
    <journal v-for="journal in filteredjournals" :journal="journal">
    </journal>
  </div>

</div>
</template>
<script>
import JournalRepository from '../../data/JournalRepository'
import EventBus from '../../components/EventBus'
import journal from './Journal'
import moment from 'moment'

export default {
  components: {
    journal
  },
  data() {
    return {
      journals: [],
      searchQuery: '',
      dateRange: '',
      title: '',
      created: moment().format('MM/DD/YYYY hh:mm')
    }
  },
  computed: {
    filteredjournals() {
      var journal_created = '';
      return this.journals.filter((journal) => {
        var startDate = this.dateRange[0];
        var endDate = this.dateRange[1];

        if (startDate && endDate) {
          var createdCheck = moment(journal.created).format('YYYY-MM-DD');
          startDate = moment(this.dateRange[0]).format('YYYY-MM-DD');
          endDate = moment(this.dateRange[1]).format('YYYY-MM-DD');
          console.log("createdCheck:" + createdCheck);
          if ((createdCheck > startDate) && (createdCheck < endDate)) {
            journal_created = moment(journal.created).format('MM/DD/YYYY');
          }
          console.log("startDate:" + startDate);
          console.log("journal_created:" + journal_created);
          console.log("endDate:" + endDate);
        }
        if (this.searchQuery) {
          if (journal_created)
            return (journal.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1 && journal.created.indexOf(journal_created) !== -1)
          else
            return (journal.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1)
        } else {
          if (startDate && endDate) {
            return (journal.created.indexOf(journal_created) !== -1);
          }
        }
        return true
      })
    }
  },
  methods: {
  },
  created() {
    console.log("created journal");
  },
  mounted() {
    JournalRepository.on('added', (journal) => {
      console.log("added");
      this.journals.unshift(journal)
    })
    JournalRepository.on('changed', ({
      key,
      title,
      created
    }) => {
      console.log("changed");
      const outdatedjournal = JournalRepository.find(this.journals, key)
      outdatedjournal.title = title
      outdatedjournal.created = this.created
    })
    JournalRepository.on('removed', ({
      key
    }) => {
      console.log("removed");
      const journalToRemove = JournalRepository.findIndex(this.journals, key)
      this.journals.splice(journalToRemove, 1)
    })
    EventBus.$on('search', (searchQuery, dateRange) => {
      console.log("searchQuery:" + searchQuery);
      console.log("dateRange:" + dateRange);
      this.searchQuery = searchQuery;
      this.dateRange = dateRange;
    })
    JournalRepository.attachFirebaseListeners()
  },
  destroyed() {
    console.log("destroyed");
    JournalRepository.detachFirebaseListeners()
    this.journals = []
  }
}
</script>
<style>
.journals {
  margin: 0px
}

form.create-journal {
  position: relative;
  width: 480px;
  margin: 75px auto 15px auto;
  background: #fff;
  padding: 15px;
  border-radius: 2px;
  box-shadow: 0 1px 5px #ccc;
}

form.create-journal input,
form.create-journal textarea {
  width: 100%;
  border: none;
  padding: 4px;
  outline: none;
  font-size: 1.2em;
}

form.create-journal button {
  position: absolute;
  right: 18px;
  bottom: -18px;
  background: #41b883;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  outline: none;
}

.no-padding {
  padding: 0 !important;
}

.journal {
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 10px #ccc;
  padding: 16px;
  margin: 10px;
}

.journal h2 {

  font-size: 1.1em;
  margin-bottom: 8px;
}

.journal pre {
  font-size: 1.1em;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
}

.journal button {
  background: none;
  border: none;
  font-size: 20px;
  opacity: 0;
  cursor: pointer;
  transition: opacity .5s;
  margin: 0 4px 0 0;
}

.journal button.edit {
  float: right;
}

.journal:hover,
.journal:focus {
  box-shadow: 0 1px 8px #797979;
}

.journal:hover button,
.journal:focus button {
  opacity: 0.6;
}
</style>
