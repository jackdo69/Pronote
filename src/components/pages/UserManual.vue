<template>
<div class="container" id="printarea">
	<div class="container">
		<h1>Pronote Guide Sheet</h1>
		<hr />
		<div class="row">
			<div class="col-md-6">
				<div class="card">
					<div class="card-body">
						<h2 class="card-title">Icons:</h2>
						<h3 class="card-text">
							<i aria-hidden="true" class="fa fa-eye-slash"> Hide Entry</i>
						</h3>
						<h3 class="card-text">
							<i aria-hidden="true" class="fa fa-eye"> Unhide Entry</i>
						</h3>
						<h3 class="card-text">
							<i aria-hidden="true" class="fa fa-archive text-danger"> Archive Entry</i>
						</h3>
						<h3 class="card-text">
							<i aria-hidden="true" class="fa fa-pencil text-primary"> Edit Journal/Entry</i>
						</h3>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="card">
					<div class="card-body">
						<h2 class="card-title">How to:</h2>
						<h3 class="card-text">Create Journal</h3>
						<p class="card-text">
							<img src="../../assets/journal.png" >
						</p>
						<h4>1. Enter a Journal name</h4>
						<h4>
							2. Enter a short description about this journal
						</h4>
						<h4>3. Click the 'plus' icon</h4>
						<hr />
						<h3 class="card-text">Create Entry</h3>
						<p class="card-text">
							<img src="../../assets/entry.png" >
					</p>
						<h4>1. Enter an entry name</h4>
						<h4>
							2. Enter an entry content
						</h4>
						<h4>3. Click the 'plus' icon</h4>
						<hr />
						<h3 class="card-text">Search</h3>
						<h4>1. Enter a Journal or Entry name, content</h4>
						<h4>
							2. If you want Journal/Note to be filter by date, choose the date range
						</h4>
						<h4>3. Click 'search'</h4>
					</div>
				</div>
			</div>
		</div>

		<div class="col-sm-12">
			<div class="text-center" style="padding: 10px">
				<a class="btn btn-success my-2 my-sm-0" v-on:click.prevent="printnow">Print User Manual</a>
			</div>
		</div>
	</div>
</div>
</template>

<script>

	import * as firebase from "firebase";
	let db = firebase.database();
	import moment from 'moment'

	export default {
		data () {
			return {
				domain : document.referrer.split('/')[2]
			}
		},
		methods : {
			printnow : function() {
				console.log('printnow')

				var disp_setting = "toolbar=yes,location=no,";
				disp_setting += "directories=yes,menubar=yes,";
				disp_setting += "scrollbars=yes,width=650, height=600, left=100, top=25";
				var content_vlue = document.getElementById("printarea").innerHTML;
				var docprint = window.open("", "", disp_setting);
				docprint.document.open();
				docprint.document.write('<!DOCTYPE html>');
				docprint.document.write('<html lang="en">');
				docprint.document.write('<head><title>My Title</title>');
				docprint.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">');
				docprint.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">');
				docprint.document.write('</head><body onLoad="self.print()">');
				docprint.document.write(content_vlue);
				docprint.document.write('</body></html>');
				docprint.document.close();
				docprint.focus();

			}
		}
	}
</script>

<style>
.media img {
	width: 200px;
}
</style>
