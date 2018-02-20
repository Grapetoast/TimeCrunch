<template>
  <div class="main">
    <h1>Time Crunch</h1>
    <p>
      This is a paragraph meant to convert the user to input their email below.
      lorem ipsum dolor est lorem ipsum dolor est lorem ipsum dolor est lorem ipsum dolor est.
      lorem ipsum dolor est lorem ipsum dolor est, lorem ipsum dolor est lorem ipsum dolor est
      lorem ipsum dolor est.
    </p>
    <h1 v-if="success">Success!!!</h1>
    <h1 v-if="wrong">Error</h1>
    <h2>Sign up for News and Updates</h2>
    <input class="email" v-model="email" placeholder="email"></input>
    <button class="submit"  v-on:click="subscribe">Sign Up</button>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'landing',
    data () {
      return {
        email: '',
        success: false,
        wrong: false
      }
    },
    methods: {
      subscribe () {
        let vue = this
        if (vue.email !== '') {
          axios.post('http://54.186.69.46:81/leads', {
            email: vue.email.toLowerCase()
          })
            .then(response => {
              vue.success = true
            })
            .catch(response => {
              console.log(response)
              this.wrong = true
            })
        }
      }
    }
  }
</script>

<style scoped lang="less">
@red: #c90c2e;
@grey: #323d38;
  .main {
    margin-top: 100px;
  }
  h1 {
    text-align: center;
    font-size: 2em;

  }
  p {
    margin-left: 5%;
  }
  h2 {
    color: @red;
    margin-left: 5%;
  }
  .email {
    border: 1px solid @grey;
    margin-left: 5%;
    height: 25px;
    width: 60%
  }
  .submit {
    margin-left: 5%;
    background-color: @red;
    color: #fff;
    border: none;
    border-radius: 5px;
    height: 30px;
  }
</style>
