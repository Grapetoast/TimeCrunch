<template>
  <div id="q-app">
    <navbar v-on:logout="logOut" :logged="logged" :user="user"></navbar>
    <router-view v-on:login="log" :logged="logged" :user="user"/>
  </div>
</template>

<script>
  import navbar from './components/elements/Navbar'

  export default {
    name: 'app',
    components: {
      'navbar': navbar
    },
    created () {
      let vue = this
      vue.user.token = localStorage.getItem('token')
      vue.user.id = localStorage.getItem('userId')
      vue.user.admin = localStorage.getItem('admin')
      if (vue.user.token !== null) {
        vue.logged = true
      }
    },
    data: function () {
      return {
        logged: true,
        user: {
          id: '',
          token: '',
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
          vue.logged = true
          vue.$router.push('/')
        }
        else {
          vue.logged = false
        }
      },
      logOut () {
        let vue = this
        vue.user.token = ''
        vue.user.id = ''
        vue.user.admin = false
        vue.logged = false
        vue.$router.push('/login')
      }
    }
  }
</script>

<style scoped lang="less">
</style>
