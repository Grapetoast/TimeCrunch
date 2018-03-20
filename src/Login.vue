<template>
  <div class="main">
    <h1>Log-In</h1>
    <div class="loginBox">
      <input class="email" placeholder="Email" v-model="email" type="email"></input>
      <input class="password" placeholder="Password" v-model="password" type="password" v-on:keypress.enter="login"></input>
      <h3 class="logged">Stay logged In?<input type="checkbox" v-model="stayLogged"></input></h3>
      <button class="login" v-on:click="login">Submit</button>
      <h2 class="registerlink" v-on:click="$router.push('/Register')">Create a New Account Here</h2>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Login',
    props: ['logged'],
    data () {
      return {
        email: '',
        password: '',
        stayLogged: false,
        user: {
          token: '',
          id: '',
          companyId: '',
          admin: false
        }
      }
    },
    created () {
      if (this.logged === true) {
        this.$router.push('/')
      }
    },
    methods: {
      login () {
        let vue = this
        axios.post('http://54.186.69.46:81/users/login', {
          email: vue.email.toLowerCase(),
          password: vue.password
        })
          .then(response => {
            if (response.status !== 401) {
              vue.user.token = response.data.token
              vue.user.id = response.data.userId
              vue.user.companyId = response.data.companyId
              vue.user.admin = response.data.admin
              if (vue.stayLogged === true) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('companyId', response.data.companyId)
                localStorage.setItem('admin', response.data.admin)
              }
              else {
                localStorage.removeItem('token')
                localStorage.removeItem('userId')
                localStorage.removeItem('companyId')
                localStorage.removeItem('admin')
              }
              vue.$emit('login', vue.user)
            }
          })
          .catch(response => {
            console.log(response)
            this.wrong = true
          })
      }
    }
  }
</script>

<style scoped lang="less">
  @red: #c90c2e;
  @grey: #323d38;

  .main {
    height: 500px;
    width: 100%;
    margin-top: 120px;
    text-align:center;
  }

  h1 {
    color: @red;
  }

  .registerlink {
    font-size: 1.3em;
    color: #005389;
  }

  .logged {
    font-size: 1.5em;

  }

  button {
    background: @grey;
    color: #fff;
    border: none;
    font-size: 1.7em;
    border-radius: 5px;
  }

  input {
    border: 1px solid #000;
    margin-top: 5px;
    margin-left: 5px;
    height: 30px;
  }
 .email {
   width: 90%;
 }
 .password {
   width: 90%;
 }
  @media (min-width: 700px) {
  }
</style>
