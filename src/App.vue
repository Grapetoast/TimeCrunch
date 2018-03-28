<template>
  <div id="q-app">
    <navbar v-on:logout="logOut" :logged="logged" :user="user"></navbar>
    <router-view v-on:login="log" v-on:register="register" :logged="logged" :user="user"/>
  </div>
</template>

<script>
import navbar from './pages/elements/Navbar'

export default {
  name: 'app',
  components: {
    'navbar': navbar
  },
  created () {
    let vue = this
    vue.user.token = localStorage.getItem('token')
    vue.user.id = localStorage.getItem('userId')
    vue.user.companyId = localStorage.getItem('companyId')
    vue.user.admin = Boolean(localStorage.getItem('admin'))
    if (vue.user.token !== null) {
      vue.logged = true
    }
  },
  data: function () {
    return {
      logged: false,
      user: {
        id: '',
        token: '',
        companyId: '',
        admin: false
      }
    }
  },
  methods: {
    log (user) {
      let vue = this
      if (user.token !== null) {
        vue.user.token = user.token
        vue.user.id = user.id
        vue.user.admin = user.admin
        vue.user.companyId = user.companyId
        vue.logged = true
        vue.$router.push('/')
      } else {
        vue.logged = false
      }
    },
    register (user) {
      let vue = this
      if (user.token !== null) {
        vue.user.token = user.data.token
        vue.user.id = user.data.id
        vue.user.admin = user.data.admin
        vue.logged = true
        vue.$router.push('/')
      } else {
        vue.logged = false
      }
    },
    logOut () {
      let vue = this
      vue.user.token = ''
      vue.user.id = ''
      vue.user.admin = false
      vue.logged = false
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('admin')
      vue.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
  .mapboxgl-marker {
    background-image: url('./assets/tc_Marker.svg');
    background-size: cover;
    width: 50px;
    height: 155px;
    z-index: 4;
    cursor: pointer;
  }
</style>
