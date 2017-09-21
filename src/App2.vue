<template>
  <div>
    <header-bar></header-bar>
    <alerts :alerts="alerts"></alerts>
    <router-view></router-view>
  </div>
</template>

<script>
// import Notes from './components/notes/Index'
import journals from './components/journals/Index'
import UpdateModal from './components/journals/UpdateModal'
// import CreatejournalForm from './components/journals/Create'
import Alerts from './components/Alerts'
import EventBus from './components/EventBus'
import HeaderBar from './components/HeaderBar'

export default {
  name: 'app2',
  components: {
    journals,
    // CreatejournalForm,
    UpdateModal,
    HeaderBar,
    Alerts
  },
  data () {
    return {
      alerts: []
    }
  },
  created () {
    EventBus.$on('alert', this.showAlert)
  },
  beforeDestroy () {
    EventBus.$off('alert')
  },
  methods: {
    showAlert (alert) {
      this.alerts.push(alert)
      setTimeout(() => {
        this.alerts.splice(alert, 1)
      }, alert.duration || 1500)
    }
  }
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html{
    font-family: Arial, Helvetica, sans-serif
  }
  body{
    background: hsla(0, 0%, 95%, 1);
    padding: 0 1rem;
  }
</style>
