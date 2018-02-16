<template>
  <div class="main">
    <div class="graphsPane">
      <div class="timeGraphsPane" v-if="pane==='time'">
      </div>
      <div class="readouts" v-else-if="pane==='readout'">
        <h3>User: {{activeUser.name}}</h3>
        <h3>Clock {{activeClock.clockType}} {{(activeClock.month + 1)}}/{{activeClock.day}} {{activeClock.hours}}:{{activeClock.minutes}}</h3>
      </div>
      <div class="mileGraphsPane" v-else>
      </div>
    </div>
    <div class="timeTab" v-on:click="pane='time'" v-if="pane!=='readout'">Time</div>
    <div class="mileTab" v-on:click="pane=''" v-if="pane!=='readout'">Distance</div>
    <div class="modals">
      <div class="userView" v-if="modal==='user'">
        <h4>{{activeUser.name}}'s Time Clocks</h4>
        <h4>{{totalHours}} hours clocked</h4>
        <input class="userSearch" v-model="userSearch" placeholder="search"></input>
        <div class="clocks" v-for="clock in clocks">
          <h5 v-on:click="viewClock(clock)">clock {{clock.clockType}}  {{(clock.month + 1)}}/{{clock.day}} {{clock.hours}}:{{clock.minutes}}</h5>
        </div>
        <button class="back" v-on:click="modal=''; resetTime(); populateCompanyClocks()">Back</button>
      </div>
      <div class="clockMapView" v-else-if="modal==='clock'">
        <button class="back" v-on:click="modal='user'; pane='time'">Back</button>
        <mapbox id="map" :access-token="mapboxToken" :map-options="mapOptions" @map-load="mapLoaded"></mapbox>
      </div>
      <div class="adminView" v-else>
        <h4>{{totalHours}} hours clocked</h4>
        <input class="globalSearch" v-model="search" placeholder="search"></input>
        <div class="user" v-for="user in users">
          <h5 v-on:click="viewUser(user)">{{user.name}}</h5>
        </div>
        <button class="back" v-on:click="$emit('back')">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Mapbox from 'mapbox-gl-vue'
  import mapboxgl from 'mapbox-gl'
  import axios from 'axios'

  export default {
    name: 'analytics',
    props: ['user'],
    components: {
      'mapbox': Mapbox
    },
    data () {
      return {
        marker: document.createElement('div'),
        coordinates: [0, 0],
        pane: 'time',
        modal: '',
        startTime: {
          hours: 0,
          minutes: 0,
          seconds: 0
        },
        endTime: {
          hours: 0,
          minutes: 0,
          seconds: 0
        },
        totalTime: {
          hours: 0,
          minutes: 0,
          seconds: 0
        },
        totalHours: 0,
        search: '',
        userSearch: '',
        users: [],
        clocks: [],
        activeUser: {
          id: '',
          name: '',
          companyId: '',
          email: '',
          admin: false
        },
        activeClock: {
          userId: '',
          clockType: '',
          month: '',
          day: '',
          hours: '',
          minutes: '',
          seconds: '',
          latitude: '',
          longitude: '',
          altitude: ''
        },
        mapboxToken: 'pk.eyJ1IjoiZ3JhcGV0b2FzdCIsImEiOiJjajhkeHR5YzEwdXp4MnpwbWhqYzI4ejh0In0.JzUlf5asD6yOa5XvjUF5Ag',
        mapOptions: {
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [0, 0],
          zoom: 1
        }
      }
    },
    created () {
      let vue = this
      axios.get('http://54.186.69.46:81/users/all/' + vue.user.companyId, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          vue.users = response.data
          vue.populateCompanyClocks()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    methods: {
      viewUser (user) {
        let vue = this
        vue.totalHours = 0
        vue.totalTime = {
          hours: 0,
          minutes: 0,
          seconds: 0
        }
        vue.activeUser.id = user._id
        vue.activeUser.name = user.name
        vue.activeUser.companyId = user.companyId
        vue.activeUser.email = user.email
        vue.activeUser.admin = user.admin
        axios.get('http://54.186.69.46:81/clocks/' + vue.activeUser.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
          .then(function (response) {
            vue.clocks = []
            vue.clocks = response.data
            vue.countClocks()
            vue.modal = 'user'
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      resetTime () {
        let vue = this
        vue.totalHours = 0
        vue.totalTime = {
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      },
      populateCompanyClocks () {
        let vue = this
        let i = 0
        vue.clocks = []
        for (i = 0; i < vue.users.length; i++) {
          vue.activeUser.id = vue.users[i]._id
          axios.get('http://54.186.69.46:81/clocks/' + vue.activeUser.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
            .then(function (response) {
              let j = 0
              for (j = 0; j < response.data.length; j++) {
                vue.clocks.push(response.data[j])
                if (vue.clocks.length === response.data.length) {
                  vue.countClocks()
                }
              }
              vue.clocks = []
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },
      countClocks () {
        let vue = this
        let i = 0
        for (i = 0; i < vue.clocks.length; i++) {
          let clockType = vue.clocks[i].clockType
          if (clockType === 'in' || clockType === 'lunch in') {
            vue.startTime = {
              hours: vue.clocks[i].hours,
              minutes: vue.clocks[i].minutes,
              seconds: vue.clocks[i].seconds
            }
          }
          else if (clockType === 'out' || clockType === 'lunch out') {
            vue.endTime = {
              hours: vue.clocks[i].hours,
              minutes: vue.clocks[i].minutes,
              seconds: vue.clocks[i].seconds
            }
            vue.totalTime = {
              hours: (vue.endTime.hours - vue.startTime.hours) + vue.totalTime.hours,
              minutes: (vue.endTime.minutes - vue.startTime.minutes) + vue.totalTime.minutes,
              seconds: (vue.endTime.seconds - vue.startTime.seconds) + vue.totalTime.seconds
            }
          }
        }
        vue.totalHours = vue.totalTime.hours + Math.floor((vue.totalTime.minutes / 60) + Math.floor(vue.totalTime.seconds / 60))
      },
      viewClock (clock) {
        let vue = this
        vue.activeClock.userId = clock.userId
        vue.activeClock.clockType = clock.clockType
        vue.activeClock.month = clock.month
        vue.activeClock.day = clock.day
        vue.activeClock.hours = clock.hours
        vue.activeClock.minutes = clock.minutes
        vue.activeClock.seconds = clock.seconds
        vue.activeClock.latitude = clock.latitude
        vue.activeClock.longitude = clock.longitude
        vue.activeClock.altitude = clock.altitude
        vue.coordinates = [vue.activeClock.longitude, vue.activeClock.latitude]
        vue.pane = 'readout'
        vue.modal = 'clock'
      },
      mapLoaded (map) {
        let vue = this
        vue.map = map
        vue.addMarker()
        vue.map.jumpTo({
          center: [vue.activeClock.longitude, (vue.activeClock.latitude - 0.007)],
          zoom: 14
        })
      },
      addMarker () {
        let vue = this
        new mapboxgl.Marker(vue.marker)
          .setLngLat(vue.coordinates)
          .addTo(vue.map)
      }
    }
  }
</script>

<style scoped lang="less">
  @red: #c90c2e;
  .main {
    display: grid;
    width: 100%;
    margin: 0;
    grid-template-rows: repeat(5, 100px);
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  #map {
    width: 100%;
    height: 50%;
    margin-top: 100%;
    padding-top: 4%;
    z-index: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
  }

  .clockMapView {
    width: 100%;
    height: 50%;
  }

  .mapboxgl-marker {
    background-image: url('../../assets/mapbox-icon.png');
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    z-index: 4;
    cursor: pointer;
  }
  .timeTab {
    margin-top: -40px;
    line-height: 100px;
    height: 100px;
    color: #fff;
    font-size: 1.5em;
    font-weight: 400;
    text-align: center;
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 3;
    background-color: @red;
  }
  .mileTab {
    margin-top: -40px;
    line-height: 100px;
    height: 100px;
    color: #fff;
    font-size: 1.5em;
    font-weight: 400;
    text-align: center;
    grid-row: 1;
    grid-column-start: 3;
    grid-column-end: 5;
    background-color: @red;
  }
  .globalSearch {
    grid-row: 2;
    grid-column-start: 1;
    grid-column-end: 5;
    width: 100%;
  }
  .graphsPane {
    grid-row-start: 3;
    grid-row-end: 5;
    grid-column-start: 1;
    grid-column-end: 5;
    border: 1px dashed #000;
  }
  .adminView {
    grid-row: 2;
    grid-column-start: 1;
    grid-column-end: 5;
    width: 100%;
  }
</style>
