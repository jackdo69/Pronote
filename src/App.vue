<template>
<div>
  <header-bar></header-bar>
  <router-view></router-view>
</div>
</template>

<script>
import Journals from './components/journals/Index'
import UpdateModal from './components/journals/UpdateModal'
import HeaderBar from './components/HeaderBar'

export default {
  name: 'app',
  components: {
    Journals,
    UpdateModal,
    HeaderBar
  },
  data () {}
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-family: Arial, Helvetica, sans-serif
}

body {
  background: hsla(0, 0%, 95%, 1);
  padding: 0 1rem;
}
</style>
