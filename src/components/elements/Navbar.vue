<template>
  <div class="main">
    <div class="navbar">
      <div class="logo"></div>
      <div v-bind:class="nvLogic" v-on:click="navToggle"></div>
      <div v-bind:class="navpaneLogic">
        <button class="Home" v-on:click="navToggle(); $router.push('/')" v-if="logged">Home</button>
        <button class="Login" v-on:click="navToggle(); $router.push('/Login')" v-if="!logged">Login</button>
        <button class="Reg" v-on:click="navToggle(); $router.push('/Register')" v-if="!logged">Register</button>
        <button class="Account" v-on:click="navToggle(); $router.push('/Account')" v-if="logged">Account</button>
        <button class="Logout" v-on:click="navToggle(); $emit('logout')" v-if="logged">Logout</button>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'navbar',
    props: ['logged', 'user'],
    data () {
      return {
        toggled: false,
        isToggled: false,
        first: true
      }
    },
    methods: {
      navToggle: function () {
        // Nav button functionality
        if (window.innerWidth < 700) {
          if (this.toggled === false) {
            this.toggled = true
            this.isToggled = true
            this.first = false
          }
          else if (this.toggled === true) {
            this.toggled = false
            this.isToggled = false
          }
        }
        else {
          this.$router.push('/')
        }
      }
    },
    computed: {
      nvLogic: function () {
        return {
          nv: true,
          navButtonAnimation: this.isToggled,
          navButtonAnimationExit: !this.isToggled && !this.first
        }
      },
      navpaneLogic: function () {
        return {
          navpane: this.first,
          navpaneAnimation: this.isToggled,
          navpaneAnimationExit: !this.isToggled && !this.first
        }
      }
    }
  }
</script>

<style scoped lang="less">

@red: #d83406;

  .navpane {
    display: none;
    overflow: hidden;
  }

  .main {
    width: 100%;
  }

  .logo {
    background-image: url('../../assets/TClogo.svg');
    background-repeat: no-repeat;
    background-size: contain;
    height: 80px;
    width: 200px;
    margin: 10px;
  }

  .nv {
    width: 80px;
    height: 80px;
    overflow: hidden;
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 20%;
    grid-column: 3;
    z-index: 8;
    background-repeat: no-repeat;
    background-image: url("../../assets/navbuttonAnimationWhiteBorder.svg");
  }

  .Login {
    height: 100px;
    color: #fff;
    font-size: 2em;
    font-weight: 400;
  }
  .Reg {
    height: 100px;
    color: #fff;
    font-size: 2em;
    font-weight: 400;
  }
  .Account {
    height: 100px;
    color: #fff;
    font-size: 2em;
    font-weight: 400;
  }
  .Home {
    height: 100px;
    color: #fff;
    font-size: 2em;
    font-weight: 400;
  }
  .Logout {
    height: 100px;
    color: #fff;
    font-size: 2em;
    font-weight: 400;
  }
  .navbar {
    width: 100%;
    height: 100px;
    border-bottom: 2px solid #d83406;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 11;
    text-align: center;
    line-height: 70px;
    font-weight: lighter;
    display: grid;
    grid-template-columns: repeat(2, 1fr) 220px repeat(2,1fr);
    grid-template-rows: 100px;
  }

  .navpaneAnimation {
    animation: navpaneAnimation .35s steps(9);
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    grid-column-start: 1;
    grid-column-end: 4;
    z-index: 10;
    width: 100%;
    height: 100px;
    background: #d83406;
    color: #fff;
    box-shadow: 0px 1px 2px #000;

  }

  .navpaneAnimationExit {
    animation: navpaneAnimationReverse .35s steps(9);
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    display: none;
  }

  .navpaneAnimationExit button {
    display: none;
  }

  @keyframes navpaneAnimation {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes navpaneAnimationReverse {
    0% { opacity: 1; }
    100% { opacity: 0; display: none;}
  }

  @keyframes navButtonAnimation {
    100% {background-position: -1440px;}
  }

  @keyframes navButtonAnimationReverse {
    0% {background-position: -1440px;}
    100% {background-position: 0px;}
  }

  .navButtonAnimation {
    animation: navButtonAnimation .35s steps(18);
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .navButtonAnimationExit {
    animation: navButtonAnimationReverse .35s steps(18);
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .hidden {
    display: none;
  }

</style>
