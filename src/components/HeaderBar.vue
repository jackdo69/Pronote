<template>
<div v-if="user">
  <nav class="navbar navbar-inverse">
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <ul class="nav navbar-nav">
            <li class="active">
              <router-link to="/home" class="nav">
                <a style="color: #fff;">Journals</a>
              </router-link>
            </li>
            <li class="">
              <router-link to="/archived" class="nav">
                <a style="color: #fff;">Archived</a>
              </router-link>
            </li>

          </ul>
        </div>
        <div class="col-sm-5">
          <div id="search" class="nav navbar-nav navbar-center">
            <form class="form-inline" role="search">
              <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                <span class="input-group-addon" id="basic-addon2"><span class="glyphicon glyphicon-search"></span></span>
                <input style="width:120px" type="text" class="search form-control input-sm" placeholder="Search" v-model="searchQuery">
              </div>
              <datepicker style="width:200px" class="form-control mb-2 mr-sm-2 mb-sm-0" v-model="date" range=range></datepicker>
              <a href="#" v-on:click.prevent="search" class="btn btn-success" type="submit">Search</a>
            </form>
          </div>
        </div>
        <div class="col-sm-4">
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
              <li v-if="user.imageUrl != null"><img style="width: 45px;" class="img-responsive" :src="user.imageUrl" :alt="user.userTitle" /></li>
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
import datepicker from 'vue-date'
export default {
  data() {
    return {
      user: null,
      searchQuery: '',
      date: [],
      range: true
    }
  },
  watch: {
    //'searchQuery': function () {
    //  EventBus.$emit('search', this.searchQuery)
    //},
    //'date': function () {
    //  EventBus.$emit('searchDate', this.date)
    //},
  },
  methods: {
    search() {
      EventBus.$emit('search', this.searchQuery, this.date);
      return false;
    },
    processUser(authed) {
      if (authed === null) {
        this.user = null
        return
      }
      this.user = {
        userTitle: authed.providerData[0].displayName || authed.providerData[0].email || '',
        imageUrl: authed.providerData[0].photoURL || 'https://ae01.alicdn.com/kf/HTB1Q2xDMXXXXXagapXXq6xXFXXXp/Free-shipping-One-Piece-font-b-Luffy-b-font-font-b-Cosplay-b-font-Costume.jpg'
      }
    },
    signOut() {
      Auth.signOut()
      this.$router.push('/auth')
    }
  },
  created() {
    Auth.onAuth(this.processUser) // processUser everytime auth state changes
    // (signs in or out)
    this.processUser(Auth.getAuth()) // processUser in case user is already
    // signed in
  },
  components: {
    datepicker
  }
}
</script>
<style>
.input-wrapper {
  background: #FFF;
  border: 0 !important;
  padding: 0 !important;
  height: 24px !important;
}

.navbar a {
  color: #fff;
}

#search {
  padding-top: 10px;
}

header {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1;
  height: 50px;
  background: #333;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .4);
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

header a:focus,
header a:hover {
  color: #41b883;
}

@media screen and (max-width: 1200px) {
  header span {
    display: none;
  }
}

@media screen and (max-width: 720px) {
  header input {
    width: calc(100% - 64px);
    margin: 0 0 0 16px;
  }
  header span,
  header img {
    display: none;
  }
}
</style>
