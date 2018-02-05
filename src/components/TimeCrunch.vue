<template>
  <div class="main">
    <div class="clock"></div>
    <div class="clockIn" v-on:click="clockIn">In</div>
    <div class="clockOut" v-on:click="clockOut">Out</div>
    <div class="lunchOut" v-on:click="lunchOut">Lunch Start</div>
    <div class="lunchIn" v-on:click="lunchIn">Lunch End</div>
    <div class="mapContainer"><mapbox id="map" :access-token="mapboxToken" :map-options="mapOptions" @map-load="mapLoaded"></mapbox></div>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'
export default {
  name: 'timecrunch',
  components: {
    'mapbox': Mapbox
  },
  created () {
    let vue = this
    if (this.logged === false) {
      this.$router.push('/login')
    }
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
  /*   let vue = this
   axios.get('https://', {

    })
      .then(response => {
        vue.lastClockType = response.data.lastClockType
      })
      .catch(response => {
        console.log(response)
      }) */
  data () {
    return {
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
      altitudeAccuracy: ''
    }
  },
  methods: {
    mapLoaded (map) {
      let vue = this
      vue.map = map
      map.jumpTo({
        center: [vue.longitude, vue.latitude],
        zoom: 15
      })
    }
  },
  clock () {
    let vue = this
    navigator.geolocation.getCurrentPosition(vue.locationSuccess, vue.locationFail)
    this.time = new Date()
    vue.hours = vue.time.getHours()
    vue.minutes = vue.time.getMinutes()
    vue.seconds = vue.time.getSeconds()
    vue.clockTime = vue.hours + ' ' + vue.minutes + ' ' + vue.seconds
  /*  axios.post('https://', {
      user: vue.user,
      time: vue.clockTime,
      location: 'latitude: ' + vue.latitude + 'longitude: ' + vue.longitude,
      clockType: vue.clockType
    })
      .then(response => {

      })
      .catch(response => {
        console.log(response)
      }) */
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
    if (this.lastClockType !== 'in') {
      this.clockType = 'in'
      this.clock()
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
  display: grid;
  grid-template-columns: 10px 1fr 1fr 10px;
  grid-template-rows: repeat(60px, 6);
}

.clock {
  margin-top: 10px;
text-align: center;
font-family: @font-face;
font-size: 4em;
grid-row: 1;
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
  margin-top: 20px;
  margin-left: 20px;
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
  margin-top: 20px;
  margin-left: 20px;
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
  margin-top: 20px;
  margin-left: 20px;
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
  margin-top: 20px;
  margin-left: 20px;
  width: 100px;
  height: 80px;
  line-height: 80px;
  border-radius: 5px;
  background-color: @buttonColor;
  grid-row: 3;
  grid-column: 3;
}
</style>
