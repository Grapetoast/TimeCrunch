<template>
  <div class="main">
    <div class="registerModal" v-if="modal==='register'">
      <h1>Register</h1>
      <h3 v-if="error">Missing Inputs</h3>
      <input class="name" v-model="name" placeholder="First Name">
      <input class="email" v-model="email" placeholder="user@example.com">
      <input class="password" v-model="password" placeholder="*********" type="password" v-if="!showPass" v-on:keypress.enter="registerUser">
      <input class="password" v-model="password" placeholder="*********" v-if="showPass" v-on:keypress.enter="registerUser">
      <button class="togglePass" v-on:click="showPass = !showPass" v-if="!showPass">Show Password</button>
      <button class="togglePass" v-on:click="showPass = !showPass" v-if="showPass">Hide Password</button>
      <form action="/charge" method="post" id="payment-form">
        <div class="form-row">
          <label for="card-element">Credit or debit card</label>
          <div id="card-element"></div>
          <div id="card-errors" role="alert"></div>
        </div>
        <button>Submit Payment</button>
      </form>
      <button class="submitRegister" v-on:click="registerUser">Submit</button>
      <button class="back" v-on:click="modal=''; error=false">Back</button>
    </div>
    <div class="employeeRegister" v-else-if="modal==='employee'">
      <h1>Enter Company Code</h1>
      <h3 v-if="error">Wrong Code</h3>
      <input class="companyCode" v-model="companyId" placeholder="Company Code">
      <button class="submitEmployee" v-on:click="submitCompanyId">Submit</button>
      <button class="back" v-on:click="modal=''; error=false">Back</button>
    </div>
    <div class="companyRegister" v-else-if="modal==='company'">
      <h1>Enter Company Information</h1>
      <h3 v-if="error">Missing Inputs</h3>
      <h3 v-if="taken">Company Code Taken</h3>
      <input class="companyCode" v-model="companyId" placeholder="Company Code">
      <input class="companyName" v-model="companyName" placeholder="Company Name">
      <button class="submitCompany" v-on:click="submitCompany">Submit</button>
      <button class="back" v-on:click="modal=''; error=false">Back</button>
    </div>
    <div class="chooseRegister" v-else>
      <h1>Are you Registering a New Company?</h1>
      <button class="companyRegisterButton" v-on:click="modal='company'">Yes</button>
      <div class="exception">
        <button class="employeeRegisterButton" v-on:click="modal='employee'">No</button>
        <h4>*Must have a company Code</h4>
      </div>
      <button class="back" v-on:click="$router.push('/login')">Back</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import stripe from 'stripe'

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
      company: false,
      companyId: '',
      companyName: '',
      error: false,
      taken: false
    }
  },
  created () {
    this.stripeSetup()
  },
  methods: {
    registerUser () {
      let vue = this
      if (vue.company === true) {
        axios.post('http://54.186.69.46:81/companys', {
          companyId: vue.companyId,
          companyName: vue.companyName
        })
          .then(function () {
            vue.error = false
          })
          .catch(function (error) {
            console.log(error)
            vue.error = true
          })
      }
      axios.post('http://54.186.69.46:81/users', {
        email: vue.email,
        password: vue.password,
        name: vue.name,
        companyId: vue.companyId,
        admin: vue.company
      })
        .then(function (user) {
          console.log(user.data.token)
          vue.$emit('register', user)
        })
        .catch(function (error) {
          console.log(error)
          vue.error = true
        })
    },
    submitCompanyId () {
      let vue = this
      axios.get('http://54.186.69.46:81/companys/' + vue.companyId)
        .then(function (response) {
          vue.companyName = response.data[0].companyName
          vue.modal = 'register'
          vue.company = false
          vue.error = false
        })
        .catch(function (error) {
          console.log(error)
          vue.error = true
        })
    },
    submitCompany () {
      let vue = this
      axios.get('http://54.186.69.46:81/companys/' + vue.companyId)
        .then(function (response) {
          console.log(response.data.length)
          if (response.data.length === 0) {
            vue.company = true
            vue.modal = 'register'
          } else {
            vue.taken = true
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    stripeSetup () {
      elements.create('card')
      card.mount('#card-element')
      card.addEventListener('change', function(event) {
        var displayError = document.getElementById('card-errors')
        if (event.error) {
          displayError.textContent = event.error.message
        } else {
          displayError.textContent = ''
        }
      })
      var form = document.getElementById('payment-form')
      form.addEventListener('submit', function(event) {
        event.preventDefault()
        const {source, error} = await stripe.createSource(card, ownerInfo)
        if (error) {
          const errorElement = document.getElementById('card-errors')
          errorElement.textContent = error.message
        } else {
          stripeSourceHandler(source)
        }
        stripe.createToken(card).then(function(result) {
          if (result.error) {
            var errorElement = document.getElementById('card-errors')
            errorElement.textContent = result.error.message
          } else {
              stripeTokenHandler(result.token)
              const stripeSourceHandler = (source) {
              const form = document.getElementById('payment-form')
              const hiddenInput = document.createElement('input')
              hiddenInput.setAttribute('type', 'hidden')
              hiddenInput.setAttribute('name', 'stripeSource')
              hiddenInput.setAttribute('value', source.id)
              form.appendChild(hiddenInput)
              form.submit()
              stripe.customers.create({
                email: "",
                source: ""
              }, function(err, customer) {
              })
            }
          }
          var stripe = require("stripe")("");
          stripe.charges.create({
            amount: 1000,
            currency: "usd",
            customer: "",
            source: "",
          }, function(err, charge) {
          });
        })
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
  }

  h1 {
    color: @red;
    text-align: center;
    font-size: 2.5em;
    margin: 0;
    width: 80%;
    margin-left: 10%;
    margin-top: 200px;
    margin-bottom: 20px;
  }

  select option[data-default] {
    color: #888;
  }

.StripeElement {
  background-color: white;
  height: 40px;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}

  button {
    background:  @grey;
    color: #fff;
    border: none;
    font-size: 1.5em;
    margin-left: 10px;
    border-radius: 5px;
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

  .submitCompany {
    width: 90%;
    height: 50px;
    margin-left: 5%;
  }

  .submitEmployee {
    width: 90%;
    height: 50px;
    margin-left: 5%;
  }

  .companyRegisterButton {
    width: 90%;
    height: 50px;
    margin-left: 5%;
  }

  .exception {
    width: 90%;
    margin-left: 5%;
    display: grid;
    grid-template-rows: 50px 20px;
    grid-template-columns: 1fr 1fr;
  }

  .employeeRegisterButton {
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 4;
    height: 50px;
    margin: 0;
    margin-top: 10px;
  }

  h4 {
    grid-row: 2;
    grid-column: 3;
    font-size: 0.9em;
    margin: 0;
    color: @red;
  }

  .back {
    width: 25%;
    margin-left: 5%;
    margin-top: 10px;
    background-color: @red;
  }

  @media (min-width: 700px) {
  }
</style>
