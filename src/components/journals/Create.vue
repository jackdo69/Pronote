<template>
  <form class="create-journal" v-on:submit.prevent="createjournal()">
    <!-- <input name="title" v-model="title" v-validate="'required|min:1'" placeholder="Enter a journal name." /> -->
    <input name="title" v-validate="'required|min:1'"
    :class="{'input': true, 'is-danger': errors.has('title') }"  placeholder="Enter a journal name." v-model="title">
    <textarea name="description" v-model="description" placeholder="Enter a short description." rows="2">
</textarea>
    <button type="submit">+</button>
  </form>
</template>
<script>
import JournalRepository from '../../data/JournalRepository'
import EventBus from '../../components/EventBus'
import moment from 'moment'
import VeeValidate from 'vee-validate';


export default {
  data() {
    return {
      title: '',
      description:'',
      created: moment().format('MM/DD/YYYY hh:mm')
    }
  },
  methods: {
    createjournal() {
      console.log("createjournal");
      if (this.title.length < 1) {
        alert('Please enter the Journal title')
      } else if (this.title.trim()|| this.description.trim()) {
        JournalRepository.create({
          title: this.title,
          description: this.description,
          created: this.created
        }, (err) => {
          // alert('woops some errors occur')
          this.title = '';
          this.description = '';
          this.created = moment().format('MM/DD/YYYY hh:mm');
          alert('Journal created successfully')
        })
      }
      // if (this.title.trim()|| this.description.trim()) {
      //   JournalRepository.create({
      //     title: this.title,
      //     description: this.description,
      //     created: this.created
      //   }, (err) => {
      //     // alert('woops some errors occur')
      //     this.title = '';
      //     this.description = '';
      //     this.created = moment().format('MM/DD/YYYY hh:mm');
      //     alert('Journal created successfully')
      //   })
      // }
    }
  }
}
</script>

<style>
form.create-journal {
  position: relative;
  width: 480px;
  margin: 25px auto 15px auto;
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
</style>
