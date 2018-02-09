<template>
  <div class="main">
    <div class="clock"></div>
    <div class="clockIn" v-on:click="clockIn">In</div>
    <div class="clockOut" v-on:click="clockOut">Out</div>
    <div class="lunchOut" v-on:click="lunchOut">Lunch Start</div>
    <div class="lunchIn" v-on:click="lunchIn">Lunch End</div>
    <mapbox id="map" :access-token="mapboxToken" :map-options="mapOptions" @map-load="mapLoaded"></mapbox>
    <marker @map-load="setMarker"></marker>
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
    }
    function locationFail () {
      alert('It seems we cant find you, please reload the page and try again.')
      this.locationError = true
    }
  },
  data () {
    return {
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
    },
    mapJump () {
      let vue = this
      vue.map.jumpTo({
        center: [vue.longitude, vue.latitude],
        zoom: 15
      })
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
    data () {
      return {
        geojson: {},
        time: '',
        hours: '',
        minutes: '',
        seconds: '',
        clockType: '',
        lastClockType: '',
        clockTime: '',
        latitude: '',
        longitude: '',
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
      clock () {
        let vue = this
        navigator.geolocation.getCurrentPosition(vue.locationSuccess, vue.locationFail)
        this.time = new Date()
        vue.hours = vue.time.getHours()
        vue.minutes = vue.time.getMinutes()
        vue.seconds = vue.time.getSeconds()
        vue.clockTime = vue.hours + ' ' + vue.minutes + ' ' + vue.seconds
      },
      mapLoaded (map) {
        let vue = this
        vue.map = map
        vue.map.jumpTo({
          center: [vue.longitude, vue.latitude],
          zoom: 15
        })
      },
      mapJump () {
        let vue = this
        vue.map.jumpTo({
          center: [vue.longitude, vue.latitude],
          zoom: 15
        })
      },
      setMarker (map) {
        let vue = this
        vue.map = map
        vue.setLngLat([vue.longitude, vue.latitude])
        vue.addTo(map)
      },
      locationFail () {
        alert('It seems we cant find you, please reload the page and try again.')
        this.locationError = true
      },
      clockIn () {
        let vue = this
        if (this.lastClockType !== 'in') {
          this.clockType = 'in'
          this.clock()
          axios.post('', {
            longitude: vue.longitude,
            latitude: vue.latitude
          })
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
@buttonColor: #fbdd21;
@font-face: tahoma;
.main {
  margin-top: 100px;
  display: grid;
  grid-template-columns:5%  1fr 1fr 5%;
  grid-template-rows: repeat(3, 100px) px repeat(4, 100px);
  grid-template-rows: repeat(3, 100px) px repeat(4, 100px);
}

#map {
	width: 100%;
	height: 300px;
  grid-row-start: 5;
  grid-row-end: 7;
  grid-column-start: 2;
  grid-column-end: 4;
}

.marker {
    display: block;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 0;
    background-image: url('');
    background-size: cover;
    width: 50px;
    height: 50px;
}

.clock {
  margin-top: 10px;
  text-align: center;
  font-family: @font-face;
  font-size: 4em;
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 2;
  grid-column-end: 4;
  border: solid 3px #fbdd21;
  border-radius: 7px;
}

.clockIn {
  font-size: 2em;
  font-weight: bold;
  font-family: @font-face;
  text-align: center;
  margin-top: 15px;
  margin-left: 20%;
  width: 100px;
  height: 80px;
  line-height: 80px;
  border-radius: 6px;
  background-color: @buttonColor;
  grid-row: 2;
  grid-column: 2;
  color: white;
}

.clockOut {
  font-size: 2em;
  font-weight: bold;
  font-family: @font-face;
  text-align: center;
  margin-top: 15px;
  margin-left: 20%;
  width: 100px;
  height: 80px;
  line-height: 80px;
  border-radius: 6px;
  background-color: @buttonColor;
  grid-row: 2;
  grid-column: 3;
  color: white;
}

.lunchIn {
  color: white;
  font-size: 1.1em;
  font-weight: bold;
  font-size: 1em;
  font-family: @font-face;
  text-align: center;
  margin-top: 15px;
  margin-left: 20%;
  width: 100px;
  height: 80px;
  line-height: 80px;
  border-radius: 6px;
  background-color: @buttonColor;
  grid-row: 3;
  grid-column: 2;
}

.lunchOut {
  color: white;
  font-size: 1.1em;
  font-weight: bold;
  font-size: 1em;
  font-family: @font-face;
  text-align: center;
  margin-top: 15px;
  margin-left: 20%;
  width: 100px;
  height: 80px;
  line-height: 80px;
  border-radius: 5px;
  background-color: @buttonColor;
  grid-row: 3;
  grid-column: 3;
}
</style>
