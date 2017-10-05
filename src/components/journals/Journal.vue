<template>
  <div class="journal">
	  <div>
	  	<a href="javascript:;" @click="viewDetail(journal.key)"><h2>{{journal.title}}</h2></a>
	  </div>
	  <div>
		  <div class="col-sm-4"><img src="../../assets/note.png" class="img-responsive"/></div>	
		  <div class="col-sm-8 no-padding">
		  	<pre>Date: {{journal.created}}</pre>
		    <button type="button" v-on:click.stop="remove(journal)">
		      <i class="fa fa-trash-o text-danger" aria-hidden="true"></i>
		    </button>
		    <button class="edit" type="button" @click="updateModal(journal)">
		      <i class="fa fa-pencil text-primary" aria-hidden="true"></i>
		    </button>
	    </div>
	 </div>
  </div>
</template>
<script>
  import journalRepository from '../../data/JournalRepository'
  import EventBus from '../EventBus'
  import moment from 'moment'
  export default {
    props: ['journal'],
    methods: {
      remove (j) {
        journalRepository.remove(j, (err) => {
          if (err) {
            EventBus.$emit('alert', {type: 'error', message: err.message})
          }
        })
      },
      updateModal (j) {
        EventBus.$emit('journal.selected', j)
      },
      viewDetail: function(key) {
  		console.log("viewDetail1111:" + key);
  		this.$router.push({ name:'/detail/:id', params: { id: key } })
  		
  	}
    }
    
  }
</script>

<style>
	.no-padding{
		padding:0 !important;
	}
  .journal {
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 10px #ccc;
    padding: 16px;
    width: 320px;
  	margin: 10px;
  }
  .journal h2{
    //*
		 * *font-size: 1.1em;*/
		 */    margin-bottom: 8px;
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
