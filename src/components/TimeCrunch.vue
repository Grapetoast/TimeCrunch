<template>
  <div class="timecrunch">
    <div class="clock"></div>
    <div class="success" v-if="modal==='success'">
      <h4>Clocked {{lastClockType}}</h4>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="prettyModal" v-else-if="modal==='pretty'">
      <h2>{{prettyMessage}}</h2>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="clockIn" v-on:click="clockIn"> Clock In</div>
    <div class="clockOut" v-on:click="clockOut">Clock Out</div>
    <div class="lunchOut" v-on:click="lunchOut">Lunch Start</div>
    <div class="lunchIn" v-on:click="lunchIn">Lunch End</div>
    <mapbox id="map" :access-token="mapboxToken" :map-options="mapOptions" @map-load="mapLoaded"></mapbox>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'
import mapboxgl from 'mapbox-gl'
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
    axios.get('http://54.186.69.46:81/users/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
      .then(function (response) {
        vue.lastClockType = response.data.lastClockType
      })
      .catch(function (error) {
        console.log(error)
      })
    vue.userId = vue.user.id
    navigator.geolocation.getCurrentPosition(locationSuccess, locationFail)
    function locationSuccess (position) {
      vue.latitude = position.coords.latitude
      vue.longitude = position.coords.longitude
      vue.altitude = position.coords.altitude
      vue.accuracy = position.coords.accuracy
      vue.altitudeAccuracy = position.coords.altitudeAccuracy
      vue.coordinates = [vue.longitude, vue.latitude]
    }
    function locationFail () {
      vue.prettyModal('It seems we cant find you, please reload the page and try again.')
      this.locationError = true
    }
  },
  data () {
    return {
      marker: document.createElement('div'),
      modal: '',
      prettyMessage: '',
      endMarker: document.createElement('div'),
      userId: '',
      time: '',
      month: '',
      day: '',
      hours: '',
      minutes: '',
      seconds: '',
      clockType: '',
      lastClockType: '',
      distance: 0,
      latitude: '',
      longitude: '',
      coordinates: [0, 0],
      endcoordinates: [-112, 34],
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
    prettyModal (message) {
      let vue = this
      vue.prettyMessage = message
      vue.modal = 'pretty'
    },
    getDirections () {
      let vue = this
      axios.get('https://api.mapbox.com/directions/v5/mapbox/driving/-112.399444,33.613509;-112,34?geometries=geojson&access_token=pk.eyJ1IjoiZ3JhcGV0b2FzdCIsImEiOiJjajhkeHR5YzEwdXp4MnpwbWhqYzI4ejh0In0.JzUlf5asD6yOa5XvjUF5Ag')
        .then(function (response) {
          vue.distance = response.data.routes[0].distance
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    mapLoaded (map) {
      let vue = this
      vue.map = map
      vue.map.jumpTo({
        center: [vue.longitude, vue.latitude],
        zoom: 15
      })
      vue.startMarker()
      vue.endMarkerMethod()
      vue.getDirections()
    },
    mapJump () {
      let vue = this
      vue.map.jumpTo({
        center: [vue.longitude, vue.latitude],
        zoom: 15
      })
    },
    startMarker () {
      let vue = this
      new mapboxgl.Marker(vue.marker)
        .setLngLat(vue.coordinates)
        .addTo(vue.map)
    },
    updateLastClockType () {
      let vue = this
      axios.put('http://54.186.69.46:81/users/' + vue.user.id, {
        lastClockType: vue.lastClockType
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (user) {
          vue.modal = 'success'
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    endMarkerMethod () {
      let vue = this
      new mapboxgl.Marker(vue.endMarker)
        .setLngLat(vue.endcoordinates)
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
          vue.lastClockType = vue.clockType
          vue.updateLastClockType()
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
      let vue = this
      vue.prettyModal('It seems we cant find you, please reload the page and try again.')
      this.locationError = true
    },
    clockIn () {
      let vue = this
      if (this.lastClockType === 'out') {
        vue.clockType = 'in'
        vue.clock()
      }
      else {
        vue.prettyModal('You are already clocked in!')
      }
    },
    clockOut () {
      let vue = this
      if (this.lastClockType === 'in' || this.lastClockType === 'lunch in') {
        this.clockType = 'out'
        this.clock()
      }
      else if (this.lastClockType === 'lunch out') {
        vue.prettyModal('You are out to lunch!')
      }
      else {
        vue.prettyModal('You are not clocked in!')
      }
    },
    lunchOut () {
      let vue = this
      if (this.lastClockType === 'in') {
        this.clockType = 'lunch out'
        this.clock()
      }
      else if (this.lastClockType === 'lunch out') {
        vue.prettyModal('You are already out to lunch!')
      }
      else if (this.lastClockType === 'lunch in') {
        vue.prettyModal('You already had lunch!')
      }
      else {
        vue.prettyModal('You are not clocked in!')
      }
    },
    lunchIn () {
      let vue = this
      if (this.lastClockType === 'lunch out') {
        this.clockType = 'lunch in'
        this.clock()
      }
      else if (this.lastClockType === 'out') {
        vue.prettyModal('You are not clocked in!')
      }
      else if (this.lastClockType === 'in') {
        vue.prettyModal('You never clocked off for lunch!')
      }
      else {
        vue.prettyModal('You are already back from lunch!')
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

<style lang="less">
@red: #c90c2e;
@grey: #323d38;

.timecrunch {
  position: fixed;
  width: 100%;
  margin-top: 78px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(7, 100px);
}

.prettyModal {
  position: absolute;
  z-index: 12;
  background-color: @red;
  border-radius: 10px;
  width: 80%;
  height: 80%;
  margin-left: 10%;
}

#map {
	width: 100%;
	height: 100%;
  margin-top: 50px;
  padding-top: none;
  grid-row-start: 2;
  grid-row-end: 7;
  grid-column-start: 1;
  grid-column-end: 7;
  z-index: 0;
  position: absolute;
  top:0;
  bottom:0;
}

.mapboxgl-marker {
  background-image: url('../assets/mapbox-icon.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  z-index: 4;
  cursor: pointer;
}

.success {
  position: absolute;
  z-index: 12;
  background-color: @grey;
  width: 100%;
  height: 160px;
  top: 0;
}

.mapboxgl-control-container {

}

.clock {
  position: relative;
  z-index: 2;
  text-align: center;
  font-size: 4em;
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 1;
  grid-column-end: 7;
  background-color: @red;
  padding-top: 20px;
  line-height: 80px;
  color: #fff;
  box-shadow: 0px 1.5px 5px #000;
}

.clockIn {
  z-index: 3;
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
  z-index: 3;
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
  z-index: 3;
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
  z-index: 3;
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
