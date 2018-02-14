<template>
  <div class="main">
    <div class="clock"></div>
    <div class="clockIn" v-on:click="clockIn"> Clock In</div>
    <div class="clockOut" v-on:click="clockOut">Clock Out</div>
    <div class="lunchOut" v-on:click="lunchOut">Lunch Start</div>
    <div class="lunchIn" v-on:click="lunchIn">Lunch End</div>
    <mapbox id="map" :access-token="mapboxToken" :map-options="mapOptions" @map-load="mapLoaded"></mapbox>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'
import axios from 'axios'

export default {
  name: 'timecrunch',
  props: ['logged', 'user'],
  components: {
    'mapbox': Mapbox
  },
  created () {
    let vue = this
    if (this.logged === false) {
      this.$router.push('/login')
    }
    vue.userId = vue.user.id
    navigator.geolocation.getCurrentPosition(locationSuccess, locationFail)
    function locationSuccess (position) {
      vue.latitude = position.coords.latitude
      vue.longitude = position.coords.longitude
      vue.altitude = position.coords.altitude
      vue.accuracy = position.coords.accuracy
      vue.altitudeAccuracy = position.coords.altitudeAccuracy
      vue.coordinates = [vue.latitude, vue.longitude]
    }
    function locationFail () {
      alert('It seems we cant find you, please reload the page and try again.')
      this.locationError = true
    }
  },
  data () {
    return {
      marker: document.createElement('div'),
      userId: '',
      time: '',
      month: '',
      day: '',
      hours: '',
      minutes: '',
      seconds: '',
      clockType: '',
      lastClockType: '',
      latitude: '',
      longitude: '',
      coordinates: [0, 0],
      altitude: '',
      accuracy: '',
      altitudeAccuracy: '',
      mapboxToken: 'pk.eyJ1IjoiZ3JhcGV0b2FzdCIsImEiOiJjajhkeHR5YzEwdXp4MnpwbWhqYzI4ejh0In0.JzUlf5asD6yOa5XvjUF5Ag',
      mapOptions: {
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [0, 0],
        zoom: 1
      }
    }
  },
  methods: {
    mapLoaded (map) {
      let vue = this
      vue.map = map
      vue.map.jumpTo({
        center: [vue.longitude, vue.latitude],
        zoom: 15
      })
      vue.addMarker()
    },
    mapJump () {
      let vue = this
      vue.map.jumpTo({
        center: [vue.longitude, vue.latitude],
        zoom: 15
      })
    },
    addMarker () {
      let vue = this
      Mapbox.Marker(vue.marker)
        .setLngLat(vue.coordinates)
        .addTo(vue.map)
    },
    clock () {
      let vue = this
      navigator.geolocation.getCurrentPosition(vue.locationSuccess, vue.locationFail)
      this.time = new Date()
      vue.month = vue.time.getMonth()
      vue.day = vue.time.getDay()
      vue.hours = vue.time.getHours()
      vue.minutes = vue.time.getMinutes()
      vue.seconds = vue.time.getSeconds()
      axios.post('http://54.186.69.46:81/clocks', {
        userId: vue.userId,
        clockType: vue.clockType,
        month: vue.month,
        day: vue.day,
        hours: vue.hours,
        minutes: vue.minutes,
        seconds: vue.seconds,
        latitude: vue.latitude,
        longitude: vue.longitude,
        altitude: vue.altitude
      })
        .then(function () {
          console.log('clocked')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    locationSuccess (position) {
      let vue = this
      vue.latitude = position.coords.latitude
      vue.longitude = position.coords.longitude
      vue.altitude = position.coords.altitude
      vue.accuracy = position.coords.accuracy
      vue.altitudeAccuracy = position.coords.altitudeAccuracy
    },
    locationFail () {
      alert('It seems we cant find you, please reload the page and try again.')
      this.locationError = true
    },
    clockIn () {
      let vue = this
      if (this.lastClockType !== 'in') {
        vue.clockType = 'in'
        vue.clock()
      }
      else {
        alert('You are already clocked in!')
      }
    },
    clockOut () {
      if (this.lastClockType !== 'out') {
        this.clockType = 'out'
        this.clock()
      }
      else {
        alert('You are not clocked in!')
      }
    },
    lunchOut () {
      if (this.lastClockType === 'in') {
        this.clockType = 'lunch out'
        this.clock()
      }
      else if (this.lastClockType === 'lunch out') {
        alert('You are already out to lunch!')
      }
      else if (this.lastClockType === 'lunch in') {
        alert('You already had lunch!')
      }
      else {
        alert('You are not clocked in!')
      }
    },
    lunchIn () {
      if (this.lastClockType !== 'lunch in') {
        this.clockType = 'lunch in'
        this.clock()
      }
      else {
        alert('You are already back from lunch!')
      }
    }
  }
}
function clock () {
  this.time = new Date()
  this.hours = this.time.getHours()
  this.minutes = this.time.getMinutes()
  this.seconds = this.time.getSeconds()
  document.querySelectorAll('.clock')[0].innerHTML = harold(this.hours) + ':' + harold(this.minutes) + ':' + harold(this.seconds)
  function harold (standIn) {
    if (standIn < 10) {
      standIn = '0' + standIn
    }
    return standIn
  }
}
setInterval(clock, 1000)
</script>

<style scoped lang="less">
@red: #c90c2e;
@grey: #323d38;

.main {
  position: fixed;
  width: 100%;
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(7, 100px);
}


#map {
	width: 100%;
	height: 100%;
  margin-top: 50px;
  grid-row-start: 2;
  grid-row-end: 7;
  grid-column-start: 1;
  grid-column-end: 7;
  z-index: 0;
  position: fixed;
}

.marker {
  background-image: url('/assets/mapbox-icon.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}


.clock {
  z-index: 2;
  text-align: center;
  font-size: 4em;
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 1;
  grid-column-end: 7;
  background-color: @red;
  line-height: 100px;
  color: #fff;
  box-shadow: 0px 1.5px 5px #000;
}

.clockIn {
  z-index: 1;
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  width: 100%;
  height: 50px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: @grey;
  grid-row: 2;
  grid-column: 1;
  color: white;
  line-height: 50px;
  box-shadow: 0px 1.5px 5px #000;
}

.lunchIn {
  z-index: 1;
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  width: 100%;
  height: 50px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: @grey;
  grid-row: 2;
  grid-column: 3;
  color: white;
  line-height: 50px;
  box-shadow: 0px 1.5px 5px #000;
}

.lunchOut {
  z-index: 1;
  color: white;
  font-size: 1.1em;
  font-weight: bold;
  font-size: 1em;
  text-align: center;
  width: 100%;
  height: 50px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: @grey;
  grid-row: 2;
  grid-column: 2;
  line-height: 50px;
  box-shadow: 0px 1.5px 5px #000;
}

.clockOut {
  z-index: 1;
  color: white;
  font-size: 1.1em;
  font-weight: bold;
  font-size: 1em;
  text-align: center;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: @grey;
  grid-row: 2;
  grid-column: 4;
  box-shadow: 0px 1.5px 5px #000;
}
</style>
