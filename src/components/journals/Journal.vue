<template>
  <div class="journal">
    <a v-bind:href="'/detail/' + journal.key"><h2>{{journal.title}}</h2></a>
    <router-link :to="{ name: 'detail', params: {  id: journal.key } }"
      <h2>{{journal.title}}</h2>
    </router-link>
    <pre>{{journal.content}}</pre>
    <button type="button" v-on:click.stop="remove">
      <i class="fa fa-trash-o" aria-hidden="true"></i>
    </button>
    <button class="edit" type="button" @click="updateModal">
      <i class="fa fa-pencil" aria-hidden="true"></i>
    </button>
  </div>
</template>
<script>
  import journalRepository from '../../data/JournalRepository'
  import EventBus from '../EventBus'

  export default {
    props: ['journal'],
    methods: {
      remove () {
        journalRepository.remove(this.journal, (err) => {
          if (err) {
            EventBus.$emit('alert', {type: 'error', message: err.message})
          }
        })
      },
      updateModal () {
        EventBus.$emit('journal.selected', this.journal)
      }
    }
  }
</script>

<style>
  .journal {
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 10px #ccc;
    padding: 16px;
    width: 320px;
    margin: 16px 0;
  }
  .journal h2{
    /*font-size: 1.1em;*/
    margin-bottom: 8px;
  }
  .journal pre {
    font-size: 1.1em;
    margin-bottom: 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
  }
  .journal button{
    background: none;
    border: none;
    font-size: 20px;
    opacity: 0;
    cursor: pointer;
    transition: opacity .5s;
    margin: 0 4px 0 0;
  }
  .journal button.edit{
    float: right;
  }
  .journal:hover, .journal:focus{
    box-shadow: 0 1px 8px #797979;
  }
  .journal:hover button, .journal:focus button{
    opacity: 0.6;
  }
</style>
