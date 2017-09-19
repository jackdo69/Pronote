<template>
  <div>
    <form class="create-journal" v-on:submit.prevent="createjournal()">
      <input name="title" v-model="title" placeholder="Journal Name"/>
      <textarea name="content" v-model="content" placeholder="introduction here..." rows="3">
      </textarea>
      <button type="submit">+</button>
    </form>

  <div class="journals" ref="journals">
    <journal v-for="journal in filteredjournals"
          :journal="journal">
    </journal>
  </div>
</div>
</template>
<script>
  import JournalRepository from '../../data/JournalRepository'
  import Masonry from 'masonry-layout'
  import EventBus from '../../components/EventBus'
  import journal from './Journal'

  export default {
    components: {
      journal
    },
    data () {
      return {
        journals: [],
        searchQuery: '',
        title: '',
        content: ''
      }
    },

    methods: {
      createjournal () {
        if (this.title.trim() || this.content.trim()) {
          JournalRepository.create({title: this.title, content: this.content}, (err) => {
            if (err) {
              return EventBus.$emit('alert', {type: 'error', message: err.message})
            }
            this.title = ''
            this.content = ''
            EventBus.$emit('alert', {type: 'success', message: 'The journal was successfully created'})
          })
        }
      }
    },

    watch: {
      'filteredjournals': {
        handler () {
          this.$nextTick(() => {
            this.masonry.reloadItems()
            this.masonry.layout()
          })
        }
      },
      deep: true
    },
    computed: {
      filteredjournals () {
        return this.journals.filter((journal) => {
          if (this.searchQuery) return (journal.title.indexOf(this.searchQuery) !== -1 || journal.content.indexOf(this.searchQuery) !== -1) // returns truthy if query is found in title or content
          return true
        })
      }
    },
    mounted () {
      this.masonry = new Masonry(this.$refs.journals, {
        itemSelector: '.journal',
        columnWidth: 320,
        gutter: 16,
        fitWidth: false
      })

      JournalRepository.on('added', (journal) => {
        this.journals.unshift(journal)
      })
      JournalRepository.on('changed', ({key, title, content}) => {
        let outdatedjournal = JournalRepository.find(this.journals, key)
        outdatedjournal.title = title
        outdatedjournal.content = content
      })
      JournalRepository.on('removed', ({key}) => {
        let journalToRemove = JournalRepository.findIndex(this.journals, key)
        this.journals.splice(journalToRemove, 1)
      })
      EventBus.$on('search', (searchQuery) => {
        this.searchQuery = searchQuery
      })
      JournalRepository.attachFirebaseListeners()
    },
    destroyed () {
      JournalRepository.detachFirebaseListeners()
      this.journals = []
    }
  }
</script>
<style>
  .journals {
    margin: 0px
  }

  form.create-journal{
    position: relative;
    width: 480px;
    margin: 75px auto 15px auto;
    background: #fff;
    padding: 15px;
    border-radius: 2px;
    box-shadow: 0 1px 5px #ccc;
  }
  form.create-journal input, form.create-journal textarea{
    width: 100%;
    border: none;
    padding: 4px;
    outline: none;
    font-size: 1.2em;
  }
  form.create-journal button{
    position: absolute;
    right: 18px;
    bottom: -18px;
    background: #41b883;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    cursor: pointer;
    outline: none;
  }
</style>
