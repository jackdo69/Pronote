<template>
	<div v-if="user">
	<nav class="navbar navbar-inverse">
	  <div class="container">
	  <div class="row">
		   <div class="col-sm-4">
		    <ul class="nav navbar-nav">
		      <li class="active">
		      <router-link to="/home" class="nav">
			  	<a style="color: #fff;">Journals</a>
				</router-link></li>
		    </ul>
		    </div>
	    <div class="col-sm-4">
		    <div id="search" class="nav navbar-nav navbar-center">
		      <form class="nav navbar-nav navbar-center" role="search">
		        <div class="input-group">
		          <input type="text" class="search form-control input-sm" placeholder="Search" v-model="searchQuery">
		          <span class="input-group-addon" id="basic-addon2"><span class="glyphicon glyphicon-search"></span></span>
		        </div>
		      </form>
		    </div>
		  </div>
	  <div class="col-sm-4">
		    <div id="navbar" class="navbar-collapse collapse">
			    <ul class="nav navbar-nav navbar-right">
			      <li  v-if="user.imageUrl != null"><img style="width: 45px;" class="img-responsive" :src="user.imageUrl" :alt="user.userTitle"/></li>
			      <li><a href="#">{{user.userTitle}}</a></li>
			      <li><a href="#" v-on:click.prevent="signOut">
			      	<i class="fa fa-sign-out" aria-hidden="true">Logout</i>
			      </a></li>
			    </ul>
			  </div>
	  </div>
	  </div>
	  </div>
	</nav>
	
	</div>
 
</template>
<script>
  import Auth from 'src/data/Auth'
  import EventBus from './EventBus'
  export default {
    data () {
      return {
        user: null,
        searchQuery: ''
      }
    },
    watch: {
      'searchQuery': function () {
        EventBus.$emit('search', this.searchQuery)
      }
    },
    methods: {
      processUser (authed) {
        if (authed === null) {
          this.user = null
          return
        }
        this.user = {
          userTitle: authed.providerData[0].displayName || authed.providerData[0].email || '', // if
																								// there's
																								// no
																								// displayName,
																								// take
																								// the
																								// email,
																								// if
																								// there's
																								// no
																								// email,
																								// use
																								// an
																								// empty
																								// string
          imageUrl: authed.providerData[0].photoURL || 'https://www.gravatar.com/avatar/' // Firebase
																							// 3 no
																							// longer
																							// supports
																							// auto
																							// Gravatar
																							// image
																							// fetch
        }
      },
      signOut () {
        Auth.signOut()
        this.$router.push('/auth')
      }
    },
    created () {
      Auth.onAuth(this.processUser) // processUser everytime auth state changes
									// (signs in or out)
      this.processUser(Auth.getAuth()) // processUser in case user is already
										// signed in
    }
  }
</script>
<style>
.navbar a{
	color:#fff;
}
#search{
	padding-top:10px;
}
  header{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
    height: 50px;
    background: #333;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,.4);
  }
  header input {
    display: block;
    width: 480px;
    margin: 0 auto;
    height: 30px;
    border: none;
    padding: 0 16px;
    border-radius: 2px;
  }
  header span {
    padding: 15px;
    color: #fff;
    position: absolute;
    right: 95px;
    top: 1px;
  }
  header img {
    width: 35px;
    height: 35px;
    border-radius: 20px;
    position: absolute;
    right: 60px;
    top: 8px;
  }
  header a {
    position: absolute;
    display: block;
    color: #fff;
    right: 15px;
    top: 10px;
    font-size: 25px;
    cursor: pointer;
    transition: color .2s;
  }
  header a:focus, header a:hover {
    color: #41b883;
  }
  @media screen and (max-width: 1200px) {
    header span{
      display: none;
    }
  }
  @media screen and (max-width: 720px) {
    header input{
      width: calc(100% - 64px);
      margin: 0 0 0 16px;
    }
    header span, header img {
      display: none;
    }
  }
</style>
