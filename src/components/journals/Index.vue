<template>
  <div>
    <form class="create-journal" v-on:submit.prevent="createjournal()">
      <input name="title" v-model="title" placeholder="Journal Name"/>
      <button type="submit">+</button>
    </form>

    <div class="journal col-sm-3" v-for="journal in journals" :key="journal.key">
		  <div>
		  	<a href="javascript:;" @click="viewDetail(journal)"><h2>{{journal.title}}</h2></a>
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
</div>
</template>
<script>
  import JournalRepository from '../../data/JournalRepository'
  import Masonry from 'masonry-layout'
  import EventBus from '../../components/EventBus'
  import journal from './Journal'
  import moment from 'moment'
  import * as firebase from "firebase";
  let db = firebase.database();
  let eventsRef = db.ref('journal')
  
  export default {
  components: {
      journal
    },
    data () {
      return {
        journals: [],
        searchQuery: '',
        title: '',
        created: moment().format('MM/DD/YYYY hh:mm')
      }
    },
	  methods:{
		  createjournal () {
	    	  console.log("createjournal");
	        if (this.title.trim()) {
	          JournalRepository.create({title: this.title, created: moment().format('MM/DD/YYYY hh:mm')}, (err) => {
	            if (err) {
	              return EventBus.$emit('alert', {type: 'error', message: err.message})
	            }
	            this.title = '';
	            this.created = moment().format('MM/DD/YYYY hh:mm');
	            EventBus.$emit('alert', {type: 'success', message: 'The journal was successfully created'})
	          })
	        }
	      },
	      remove (j) {
		    	JournalRepository.remove(j, (err) => {
		        if (err) {
		          EventBus.$emit('alert', {type: 'error', message: err.message})
		        }
		      })
		    },
		    updateModal (j) {
		      EventBus.$emit('journal.selected', j)
		    },
		    viewDetail: function(journal) {
		    	console.log("viewDetail-journal:");
		    	console.log(journal);
		    	console.log(journal.key);
		    	this.$router.push({ name:'/detail/:id', params: { id: journal.key } })
				
			}
	  	
	  },
	  created() {
		  console.log("created journal");
			this.$bindAsArray('journals', JournalRepository.ref);
		},
	    mounted () {
	    	console.log("mounted");
	    
	      JournalRepository.on('added', (journal) => {
	        this.journals.unshift(journal)
	      })
	      JournalRepository.on('changed', ({key, title, created}) => {
	    	  const outdatedjournal = JournalRepository.find(this.journals, key)
	        outdatedjournal.title = title
	        outdatedjournal.created = created
	      })
	      JournalRepository.on('removed', ({key}) => {
	        const journalToRemove = JournalRepository.findIndex(this.journals, key)
	        this.journals.splice(journalToRemove, 1)
	      })
	      EventBus.$on('search', (searchQuery) => {
	        this.searchQuery = searchQuery
	      })
	      JournalRepository.attachFirebaseListeners()
	    },
	    destroyed () {
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
  
  .no-padding{
		padding:0 !important;
	}
.journal {
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 10px #ccc;
  padding: 16px;
  margin: 10px;
}
.journal h2{
  //// * *
 *font-size: 1.1em;*/
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
