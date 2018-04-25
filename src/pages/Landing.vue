<template>
  <div class="main">
    <h1>Available Now on the Android App Store!</h1>
    <p>
      When managing your business, you need innovative and reliable tools to increase
      your profits and cut your costs. Timecrunch allows your business to manage
      employees with precision.</p>
      <h4>Time Tracking and GPS Location Monitoring<h4>To support your company financially &amp;
      logistically, giving the ability to coordinate like NEVER before.</p>
      <h3>Decrease "Lost Time"<br/> & <br/>Maximize Productivity!
    </h3>
    <h1 v-if="success">Success!!!</h1>
    <h1 v-if="wrong">Error</h1>
<<<<<<< HEAD
    <h2>Sign Up for our Email List to get Updates and News...</h2>
=======
    <h2>Sign up for More Information on TimeCrunch!</h2>
>>>>>>> 4d0dae068fc725839330ea2f9c324dbb19393cb6
    <input class="email" v-model="email" placeholder="email">
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
    width: 90%;
  }
h4 {
    color: @red;
    font-size: 1.1em;
    text-align: center;
  }
  h2 {
    color: @red;
    margin-left: 5%;
    font-size: 1em;
  }
  h3 {
    color: grey;
    margin-left: 5%;
    width: 90%;
    font-size: 1.5em;
    font-style: italic ;
    text-align: center;
    line-height: 30px;
    font-weight: 400;
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
