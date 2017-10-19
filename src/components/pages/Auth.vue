<template>
<div class="container">
	<div class="card auth-form mx-auto mt-5">
		<form v-on:submit.prevent="wantsToSignUp ? signUpWithPassword() : loginWithPassword()">
			<div id="logoauth">
				<img src="../../assets/Pen_logo.png" />
			</div>
			<div>
					<h1 class="text-center">Welcome to Pronote!</h1>
			</div>
			<h2 class="text-center">{{wantsToSignUp ? 'Sign Up Below' : 'Sign In Below'}}</h2>
			<div v-show="wantsToSignUp" class="form-group">
				<label for="confirm-password">Username</label> <input class="form-control" name="username" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('username') }" type="text"
					placeholder="Username" v-model="username"> <i v-show="errors.has('username')" class="fa fa-warning"></i> <span v-show="errors.has('username')" class="help is-danger">{{
					errors.first('username') }}</span>
			</div>
			<div v-show="wantsToSignUp" class="form-group">
				<label for="confirm-password">Firstname</label> <input class="form-control" name="firstname" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('firstname') }"
					type="text" placeholder="Firstname" v-model="firstname"> <i v-show="errors.has('firstname')" class="fa fa-warning"></i> <span v-show="errors.has('firstname')" class="help is-danger">{{
					errors.first('firstname') }}</span>
			</div>
			<div v-show="wantsToSignUp" class="form-group">
				<label for="confirm-password">Lastname</label> <input class="form-control" name="lastname" v-validate="'required|min:3'" :class="{'input': true, 'is-danger': errors.has('lastname') }" type="text"
					placeholder="Lastname" v-model="lastname"> <i v-show="errors.has('lastname')" class="fa fa-warning"></i> <span v-show="errors.has('lastname')" class="help is-danger">{{
					errors.first('lastname') }}</span>
			</div>
			<div class="form-group">
				<label for="email">Email</label>
				<!-- <input class="form-control" type="email" name="email" id="email" required placeholder="Email" v-model="email"> -->
				<input class="form-control" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email" v-model="email"> <span
					v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<!-- <input class="form-control" type="password" name="password" id="password" required v-model="password"> -->
				<input class="form-control" name="password" v-validate="'required|min:6'" :class="{'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="Password" v-model="password">
				<i v-show="errors.has('password')" class="fa fa-warning"></i> <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
			</div>
			<div v-show="wantsToSignUp" class="form-group">
				<label for="confirm-password">Confirm Password</label>
				<!-- <input class="form-control" type="password" name="confirm-password" id="confirm-password" v-model="confirmPassword"> -->
				<input class="form-control" name="confirm-password" v-validate="'required|min:6'" :class="{'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="Password"
					v-model="confirmPassword"> <i v-show="errors.has('password')" class="fa fa-warning"></i> <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
			</div>
			<div v-show="!wantsToSignUp" class="form-group text-center">
				<button type="submit" class="btn btn-success btn-block">Log in</button>
			</div>
			<div v-show="wantsToSignUp == true" class="form-group">
				<button type="submit" class="btn btn-success btn-block signup-submit">Sign up</button>
			</div>
			<div class="text-center">
				<a class="d-block small mt-3" v-show="wantsToSignUp !== true" v-on:click="wantsToSignUp = true" href="#">Sign up</a> <a class="d-block small mt-3" v-show="wantsToSignUp == true"
					v-on:click="wantsToSignUp = false" href="#">Sign in</a>
			</div>
		</form>
	</div>
</div>
</template>
<script>
	import Auth from '../../data/Auth'

	export default {
		data () {
			return {
				username : '',
				firstname : '',
				lastname : '',
				email : '',
				password : '',
				confirmPassword : '',
				wantsToSignUp : false
			}
		},
		methods : {
			signUpWithPassword () {
				if (this.password === this.confirmPassword) {
					Auth.signUpWithPassword({
						email : this.email,
						password : this.password
					})
						.then((userData) => {
							console.log("signUpWithPassword success:");
							var uid = userData.uid;
							console.log(userData);
							Auth.userInfo({
								username : this.username,
								firstname : this.firstname,
								lastname : this.lastname
							});
							this.loginWithPassword();
						})
				} else {
					alert('Password not match')
				}
			},
			loginWithPassword () {
				return Auth.loginWithPassword({
					email : this.email,
					password : this.password
				})
					.then((userData) => {
						console.log(userData);
						this.onSignedIn()
						return userData
					})
			},
			onSignedIn () {
				var redirect = this.$route.query.redirect;
				if (redirect) {
					this.$router.push(this.$route.query.redirect);
				} else {
					this.$router.push({
						name : 'home'
					})
				}

			}
		}
	}
</script>
<style>

h1{
	font-family: Arial,Helvetica,sans-serif;

}

h2{
	font-family: Arial,Helvetica,sans-serif;

}

#logoauth img {
	display: block;
	margin: auto;
	height: 184px;
}
.auth-form {
	width: 480px;
	max-width: 100%;
	margin: 10vh auto 15px;
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
