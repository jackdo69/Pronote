<template>
<div class="container">
  <div class="card auth-form mx-auto mt-5">
    <form v-on:submit.prevent="wantsToSignUp ? signUpWithPassword() : loginWithPassword()">
      <h1>{{wantsToSignUp ? 'Sign up' : 'Sign in'}}</h1>
      <div class="form-group">
        <label for="email">Email</label>
        <!-- <input class="form-control" type="email" name="email" id="email" required placeholder="Email" v-model="email"> -->
        <input class="form-control" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email" v-model="email">
        <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <!-- <input class="form-control" type="password" name="password" id="password" required v-model="password"> -->
        <input class="form-control" name="password" v-validate="'required|min:6'"  :class="{'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="Password" v-model="password">
                <i v-show="errors.has('password')" class="fa fa-warning"></i>
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
      </div>
      <div v-show="wantsToSignUp" class="form-group">
        <label for="confirm-password">Confirm Password</label>
        <!-- <input class="form-control" type="password" name="confirm-password" id="confirm-password" v-model="confirmPassword"> -->
        <input class="form-control" name="confirm-password" v-validate="'required|min:6'"  :class="{'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="Password" v-model="confirmPassword">
                <i v-show="errors.has('password')" class="fa fa-warning"></i>
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
      </div>
      <div v-show="!wantsToSignUp" class="form-group text-center">
        <button type="submit" class="btn btn-success btn-block">Log in</button>
      </div>
      <div v-show="wantsToSignUp == true" class="form-group">
        <button type="submit" class="btn btn-success btn-block signup-submit">Sign up</button>
      </div>
      <div class="text-center">
        <a class="d-block small mt-3" v-show="wantsToSignUp !== true" v-on:click="wantsToSignUp = true" href="#">Sign up</a>
        <a class="d-block small mt-3" v-show="wantsToSignUp == true" v-on:click="wantsToSignUp = false" href="#">Sign in</a>
      </div>
    </form>
  </div>
</div>
</template>
<script>
import Auth from '../../data/Auth'

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      wantsToSignUp: false
    }
  },
  methods: {
    signUpWithPassword() {
      if (this.password === this.confirmPassword) {
        Auth.signUpWithPassword({
            email: this.email,
            password: this.password
          })
          .then((userData) => this.loginWithPassword())
      } else {
        alert ('Password not match')
      }
    },
    loginWithPassword() {
      return Auth.loginWithPassword({
          email: this.email,
          password: this.password
        })
        .then((userData) => {
          this.onSignedIn()
          return userData
        })
    },
    onSignedIn() {
      var redirect = this.$route.query.redirect;
      if (redirect) {
        this.$router.push(this.$route.query.redirect);
      } else {
        this.$router.push({
          name: 'home'
        })
      }

    }
  }
}
</script>
<style>
.auth-form {
  width: 480px;
  max-width: 100%;
  margin: 25vh auto 15px;
  background: #fff;
  padding: 15px;
  border-radius: 2px;
  box-shadow: 0 1px 5px #ccc;
}

.auth-form h1 {
  font-weight: 300;
}

.auth-form>div {
  margin-top: 15px;
}

.auth-form hr {
  margin-top: 20px;
}


</style>
