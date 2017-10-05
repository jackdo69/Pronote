<template>
  <form class="create-journal" v-on:submit.prevent="createJournal()">
    <input name="title" v-model="title" placeholder="Title"/>
    <textarea name="content" v-model="content" placeholder="Text goes here..." rows="3">
    </textarea>
    <button type="submit">+</button>
  </form>
</template>
<script>
  import journalRepository from '../../data/JournalRepository'
  import EventBus from '../../components/EventBus'

  export default {
    data () {
      return {
        title: '',
        content: ''
      }
    },
    methods: {
      createJournal () {
        if (this.title.trim() || this.content.trim()) {
          journalRepository.create({title: this.title, content: this.content}, (err) => {
            if (err) {
              return EventBus.$emit('alert', {type: 'error', message: err.message})
            }
            this.title = ''
            this.content = ''
            EventBus.$emit('alert', {type: 'success', message: 'Journal was successfully created'})
          })
        }
      }
    }
  }
</script>

<style>
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
