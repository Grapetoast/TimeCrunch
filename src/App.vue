<template>
  <div id="q-app">
    <navbar v-on:logout="logOut" :logged="logged" :user="user"></navbar>
    <div class="prettyModal" v-if="modal==='pretty'">
      <h2>{{prettyMessage}}</h2>
      <button class="prettyBack" v-on:click="modal=''">Back</button>
    </div>
    <router-view v-on:login="log" v-on:register="register" :logged="logged" :user="user"/>
  </div>
</template>

<script>
import axios from 'axios'
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
        axios.get('http://54.186.69.46:81/users/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
          .then(function (response) {
            vue.lastClockType = response.data.lastClockType
            vue.onDeviceReady()
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    data: function () {
      return {
        modal: '',
        prettyMessage: '',
        logged: false,
        lastClockType: '',
        user: {
          id: '',
          token: '',
          companyId: '',
          admin: false
        },
        distance: 0,
        latitude: '',
        longitude: '',
        firstStarted: true,
        tripStarted: false,
        coordinates: [0, 0],
        pastCoordinates: [0, 0],
        time: '',
        trip: {
          userId: '',
          distance: 0,
          start: {
            startCoordinates: [0, 0],
            latitude: '',
            longitude: '',
            day: 0,
            month: 0,
            hour: 0,
            minute: 0,
            second: 0
          },
          end: {
            endCoordinates: [0, 0],
            latitude: '',
            longitude: '',
            day: 0,
            month: 0,
            hour: 0,
            minute: 0,
            second: 0
          }
        },
        mapboxToken: 'pk.eyJ1IjoiZ3JhcGV0b2FzdCIsImEiOiJjajhkeHR5YzEwdXp4MnpwbWhqYzI4ejh0In0.JzUlf5asD6yOa5XvjUF5Ag'
      }
    },
    methods: {
      prettyModal (message) {
        let vue = this
        vue.prettyMessage = message
        vue.modal = 'pretty'
      },
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
      },
      mileageLogic () {
        let vue = this
        vue.prettyModal('logic')
        if (vue.firstStarted === true) {
          navigator.geolocation.getCurrentPosition(vue.locationSuccess, vue.locationFail)
        } else if (vue.lastClockType !== 'out') {
          vue.pastCoordinates = vue.coordinates
          navigator.geolocation.getCurrentPosition(vue.mileageLocationSuccess, vue.locationFail)
        }
      },
      locationSuccess (position) {
        let vue = this
        vue.coordinates = [position.coords.longitude.toPrecision(6), position.coords.latitude.toPrecision(5)]
        vue.pastCoordinates = vue.coordinates
        vue.firstStarted = false
      },
      mileageLocationSuccess (position) {
        let vue = this
        vue.coordinates = [position.coords.longitude.toPrecision(6), position.coords.latitude.toPrecision(5)]
        if (vue.tripStarted === false) {
          if (vue.pastCoordinates[0] !== vue.coordinates[0] || vue.pastCoordinates[1] !== vue.coordinates[1]) {
            vue.trip.start.startCoordinates = vue.pastCoordinates
            vue.time = new Date()
            vue.trip.start.month = vue.time.getMonth()
            vue.trip.start.day = vue.time.getDay()
            vue.trip.start.hour = vue.time.getHours()
            vue.trip.start.minute = vue.time.getMinutes()
            vue.trip.start.second = vue.time.getSeconds()
            vue.trip.start.latitude = vue.pastCoordinates[0]
            vue.trip.start.longitude = vue.pastCoordinates[1]
            vue.tripStarted = true
            vue.prettyModal('trip started')
          }
        } else if (vue.tripStarted === true) {
          if (vue.pastCoordinates[0] === vue.coordinates[0] && vue.pastCoordinates[1] === vue.coordinates[1]) {
            vue.trip.end.endCoordinates = vue.coordinates
            vue.time = new Date()
            vue.trip.end.month = vue.time.getMonth()
            vue.trip.end.day = vue.time.getDay()
            vue.trip.end.hour = vue.time.getHours()
            vue.trip.end.minute = vue.time.getMinutes()
            vue.trip.end.second = vue.time.getSeconds()
            vue.trip.end.latitude = vue.coordinates[0]
            vue.trip.end.longitude = vue.coordinates[1]
            vue.trip.userId = vue.user.id
            vue.getDirections()
            vue.postTrip()
            vue.prettyModal('trip ended')
            vue.tripStarted = false
          }
        }
      },
      locationFail () {
        let vue = this
        vue.prettyModal('It seems we cant find you, please reload the page and try again.')
        this.locationError = true
      },
      getDirections () {
        let vue = this
        axios.get('https://api.mapbox.com/directions/v5/mapbox/driving/' + vue.trip.start.startCoordinates + ';' + vue.trip.end.endCoordinates + '?geometries=geojson&access_token=' + vue.mapboxToken)
          .then(function (response) {
            vue.trip.distance = response.data.routes[0].distance
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      postTrip () {
        let vue = this
        axios.post('http://54.186.69.46:81/trips', {
          userId: vue.user.id,
          start: {
            latitude: vue.trip.start.latitude,
            longitude: vue.trip.start.longitude,
            month: vue.trip.start.month,
            day: vue.trip.start.day,
            hour: vue.trip.start.hour,
            minute: vue.trip.start.minute,
            second: vue.trip.start.second
          },
          end: {
            latitude: vue.trip.end.latitude,
            longitude: vue.trip.end.longitude,
            month: vue.trip.end.month,
            day: vue.trip.end.day,
            hour: vue.trip.end.hour,
            minute: vue.trip.end.minute,
            second: vue.trip.end.second
          },
          distance: vue.trip.distance
        })
          .then(function (response) {
            vue.prettyModal('trip Success!!')
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      onDeviceReady () {
        let vue = this
        try {
          cordova.plugins.backgroundMode.enable()
        } catch (error) {
          vue.prettyModal('Failed to enable Background Mode, please review settings and restart app.')
        }
        vue.tripLogic()
      },
      tripLogic () {
        let vue = this
        setInterval(function () { vue.mileageLogic() }, 30000)
        vue.$router.push('/')
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

<style scoped lang="less">
</style>
