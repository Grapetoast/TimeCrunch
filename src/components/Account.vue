<template>
  <div class="main">
    <div class="accountView" v-if="modal==='view'">
      <h2 class="name">Name: {{activeUser.name}}</h2>
      <h2 class="email">Email: {{activeUser.email}}</h2>
      <button class="accountEditButton" v-on:click="modal='edit'">Edit Account</button>
      <button class="passwordEditButton" v-on:click="modal='pass'">Update Password</button>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="accountEdit" v-else-if="modal==='edit'">
      <input class="nameEdit" v-model="activeUser.name" placeholder="Name"></input>
      <input class="emailEdit" v-model="activeUser.email" placeholder="user@example.com"></input>
      <button class="submitEdit" v-on:click="updateUser">Submit</button>
      <button class="back" v-on:click="modal='view'">Back</button>
    </div>
    <div class="updatePass" v-else-if="modal==='pass'">
      <input class="passwordEdit" v-model="activeUser.password" placeholder="********" v-if="!showPass" type="password">
      <input class="passwordEdit" v-model="activeUser.password" placeholder="********" v-if="showPass">
      <button class="togglePass" v-on:click="showPass = !showPass" v-if="!showPass">Show Password</button>
      <button class="togglePass" v-on:click="showPass = !showPass" v-if="showPass">Hide Password</button>
      <button class="submitUpdatePass" v-on:click="updatePass">Submit</button>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="success" v-else-if="modal==='success'">
      <h1>Success!!</h1>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="accountHome" v-else>
      <h1>Account</h1>
      <button class="update" v-on:click="modal='pass'">Update Password</button>
      <button class="viewAccount" v-on:click="modal='view'">View Account</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'account',
    props: ['logged', 'user'],
    data () {
      return {
        modal: '',
        showPass: false,
        activeUser: {
          id: '',
          email: '',
          password: '',
          name: ''
        }
      }
    },
    created () {
      if (this.logged !== true) {
        this.$router.push('/login')
      }
    },
    methods: {
      updateUser () {
        let vue = this
        axios.put('http://54.186.69.46:81/users/' + vue.activeUser.id, {
          email: vue.activeUser.email,
          name: vue.activeUser.name
        }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
          .then(function (user) {
            vue.activeUser.email = user.data.email
            vue.activeUser.name = user.data.name
            vue.modal = 'view'
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      updatePass () {
        let vue = this
        axios.put('http://54.186.69.46:81/users/' + vue.user.id, {
          password: vue.activeUser.password
        }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
          .then(function (user) {
            vue.modal = 'success'
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      clearActiveUser () {
        let vue = this
        vue.activeUser.email = ''
        vue.activeUser.name = ''
      },
      populateActiveUser () {
        let vue = this
        axios.get('http://54.186.69.46:81/users/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
          .then(function (response) {
            vue.activeUser.email = response.data.email
            vue.activeUser.firstName = response.data.name
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      registerUser () {
        let vue = this
        axios.post('http://54.186.69.46:81/users', {
          email: vue.activeUser.email,
          password: vue.activeUser.password,
          name: vue.activeUser.name
        })
          .then(function () {
            vue.modal = 'success'
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped lang="less">
  @nvmgrey: #dae5ed;
  @nvmblue: #005389;
  @nvmred: #b20938;
  @nvmlightred: #e21b3c;

  .main {
    margin-top: 120px;
  }

  h1 {
    color: @nvmlightred;
    text-align: center;
  }

  h2 {
    font-size: 2em;
    background-color: @nvmgrey;
    padding-left: 5%;
  }

  input {
    width: 90%;
    font-size: 1.5em;
    background-color: @nvmgrey;
    padding-left: 5%;
    margin-left: 5%;
  }

  select option[data-default] {
    color: #888;
  }

  button {
    background: linear-gradient(#e21b3c, #b20938);
    border: none;
    color: #fff;
    font-size: 2em;
    width: 90%;
    margin-bottom: 20px;
    margin-left: 5%;
  }

  .accountEditButton {
    margin-bottom: 20px;
    background-color: @nvmblue;
  }

  .submitEdit {
    background-color: @nvmblue;
  }
</style>
