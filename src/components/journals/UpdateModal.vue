<template>
<transition name="modal">
  <div v-if="journal" class="backdrop" @click.self="dismissModal">
    <form class="edit-journal" v-on:submit.prevent="update">
      <input name="title" v-model="journal.title" placeholder="Title" />
      <input name="created" v-model="created" type="hidden" />
      <button type="button" v-on:click="remove">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      <button type="submit">Done</button>
    </form>
  </div>
</transition>
</template>
<script>
import Vue from 'vue'
import journalRepository from '../../data/JournalRepository'
import EventBus from '../../components/EventBus'
import moment from 'moment'
export default {
  data() {
    return {
      journal: null,
      created: moment().format('MM/DD/YYYY hh:mm')
    }
  },
  created() {
    EventBus.$on('journal.selected', (journal) => {
      console.log(journal);
      this.journal = Vue.util.extend({}, journal)
    })
  },
  beforeDestroy() {
    EventBus.$off('journal.selected')
  },

  methods: {
    remove() {
      journalRepository.remove(this.journal, (err) => {
        alert('error occur')
        this.dismissModal()
      })
    },
    update() {

      journalRepository.update(this.journal, (err) => {
        alert('some errors occur')
        this.dismissModal()
      })
    },
    dismissModal() {
      this.journal = null
    }
  }
}
</script>
<style>
.backdrop {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(50, 50, 50, 0.8);
}

form.edit-journal {
  position: relative;
  width: 480px;
  max-width: 100%;
  margin: 25vh auto 0;
  background: #fff;
  padding: 15px;
  border-radius: 2px;
  box-shadow: 0 1px 50px #555;
}

form.edit-journal input,
form.edit-journal textarea {
  width: 100%;
  max-width: 100%;
  border: none;
  padding: 4px;
  outline: none;
  font-size: 1.2em;
  color: #555555;
}

form.edit-journal input {
  color: black;
  font-size: 1.4em;
}

form.edit-journal button[type=submit] {
  font-size: 18px;
  float: right;
  background: #41b883;
  color: #fff;
  border: none;
  border-radius: 3px;
  opacity: 1;
  cursor: pointer;
  padding: 4px 6px;
  margin: 0;
}

form.edit-journal button {
  background: none;
  border: none;
  font-size: 20px;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity .5s;
  margin: 0 4px 0 0;
}

form.edit-journal button:hover,
form.edit-journal button:focus {
  opacity: 1;
}

/* modal transition */

.modal-transition {
  transition: opacity .3s ease;
  opacity: 1;
}

.modal-transition form {
  transition: transform .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.modal-enter,
.modal-leave {
  opacity: 0;
}

.modal-enter form,
.modal-leave form {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
