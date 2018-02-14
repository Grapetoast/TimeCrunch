<template>
  <div class="main">
    <div class="registerModal" v-if="modal==='register'">
      <h1>Register</h1>
      <input class="name" v-model="name" placeholder="First Name"></input>
      <input class="email" v-model="email" placeholder="user@example.com"></input>
      <input class="password" v-model="password" placeholder="*********" type="password" v-if="!showPass" v-on:keypress.enter="registerUser">
      <input class="password" v-model="password" placeholder="*********" v-if="showPass" v-on:keypress.enter="registerUser">
      <button class="togglePass" v-on:click="showPass = !showPass" v-if="!showPass">Show Password</button>
      <button class="togglePass" v-on:click="showPass = !showPass" v-if="showPass">Hide Password</button>
      <button class="submitRegister" v-on:click="registerUser">Submit</button>
      <button class="back" v-on:click="$router.push('/Login')">Back</button>
    </div>
    <div class="employeeRegister" v-else-if="modal==='employee'">
      <h1>Enter Company Code</h1>
      <input class="companyCode" v-model="companyId" placeholder="Company Code"></input>
      <button class="submitEmployee" v-on:click="submitCompanyId">Submit</button>
    </div>
    <div class="companyRegister" v-else-if="modal==='company'">
      <h1>Enter Company Information</h1>
      <input class="companyCode" v-model="companyId" placeholder="Company Code"></input>
      <input class="companyName" v-model="companyName" placeholder="Company Name"></input>
      <button class="submitCompany" v-on:click="submitCompany">Submit</button>
    </div>
    <div class="chooseRegister" v-else>
      <h1>Are you registering a new Company?</h1>
      <button class="companyRegisterButton" v-on:click="modal='company'">Yes</button>
      <button class="employeeRegisterButton" v-on:click="modal='employee'">No (Must have a company Code)</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Register',
    props: ['logged', 'user'],
    data () {
      return {
        modal: '',
        showPass: false,
        email: '',
        password: '',
        name: '',
        companyId: '',
        companyName: ''
      }
    },
    methods: {
      registerUser () {
        let vue = this
        axios.post('http://54.186.69.46:81/users', {
          email: vue.email,
          password: vue.password,
          name: vue.name,
          companyId: vue.companyId
        })
          .then(function (user) {
            vue.$emit('login', user)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      submitCompanyId () {
        let vue = this
        vue.modal = 'register'
      },
      submitCompany () {
        let vue = this
        vue.modal = 'register'
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
  }

  h1 {
    color: @red;
    text-align: center;
  }

  select option[data-default] {
    color: #888;
  }

  button {
    background:  @grey;
    color: #fff;
    border: none;
    font-size: 1.5em;
    margin-left: 10px;
  }
  input {
    border: 1px solid @grey;
    width: 90%;
    margin-left: 5%;
    height: 40px;
    margin-bottom: 10px;
  }
  .role {
    border: 1px solid @grey;
    width: 90%;
    margin-left: 5%;
    height: 40px;
    margin-bottom: 10px;
  }
  .togglePass {
    width: 50%;
    margin-left: 20px;
  }

  .submitRegister {
    width: 35%;
  }

  .back {
    width: 50%;
    margin-left: 20px;
    margin-top: 10px;
  }
  @media (min-width: 700px) {
  }
</style>
