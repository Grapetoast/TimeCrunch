<template>
  <div v-bind:class="analyticsLogic">
    <div class="graphsPane">
      <div class="timeGraphsPane" v-if="pane==='time'">
        <h4 v-if="modal==='user'">{{activeUser.name}}'s Time Record</h4>
        <h4>{{totalHours}} Total Hours Clocked</h4>
      </div>
      <div class="readouts" v-else-if="pane==='readout'">
        <div v-if="modal==='clock'">
          <h3>User: {{activeUser.name}}</h3>
          <h3>Clock {{activeClock.clockType}} {{(activeClock.month + 1)}}/{{activeClock.day}} {{activeClock.hours}}:{{activeClock.minutes}}</h3>
        </div>
        <div v-else>
          <h3>User: {{activeUser.name}}</h3>
          <h3>Trip on {{activeTrip.start.month + 1}}/{{activeTrip.start.day}} Distance: {{Math.floor(activeTrip.distance / 1609.34)}} Miles</h3>
          <h3>Start Time - {{activeTrip.start.hour}}:{{activeTrip.start.minute}}</h3>
          <h3>End Time - {{activeTrip.end.hour}}:{{activeTrip.end.minute}}</h3>
        </div>
      </div>
      <div class="mileGraphsPane" v-else>
        <h4 v-if="modal==='user'">{{activeUser.name}}'s Mileage Record</h4>
        <h4>{{totalDistance}} Total Miles Driven</h4>
      </div>
    </div>
    <div class="timeTab" v-on:click="pane='time'" v-if="pane!=='readout'">Time</div>
    <div class="mileTab" v-on:click="pane=''" v-if="pane!=='readout'">Distance</div>
    <div class="modals">
      <div class="userView" v-if="modal==='user'">
        <button class="back" v-on:click="modal=''; resetTime(); populateCompanyClocks(); populateCompanyTrips()">Back</button>
        <input class="userSearch" v-model="userSearch" placeholder="Search Clocks...">
        <div class="clocks" v-for="clock in clocks" v-bind:key="clock.id" v-if="pane==='time'">
          <h5 v-on:click="viewClock(clock)">clock {{clock.clockType}}  {{(clock.month + 1)}}/{{clock.day}} {{clock.hours}}:{{clock.minutes}}</h5>
        </div>
        <div class="trips" v-for="trip in trips" v-bind:key="trip.id" v-if="pane===''">
          <h5 v-on:click="viewTrip(trip)">Trip On {{trip.start.month + 1}}/{{trip.start.day}} Distance: {{Math.floor(trip.distance / 1609.34)}} Miles</h5>
        </div>
      </div>
      <div class="clockMapView" v-else-if="modal==='clock'">
        <button class="mapBack" v-on:click="modal='user'; pane='time'">Back</button>
        <mapbox id="map" :access-token="mapboxToken" :map-options="mapOptions" @map-load="mapLoaded"></mapbox>
      </div>
      <div class="tripMapView" v-else-if="modal==='trip'">
        <button class="mapBack" v-on:click="modal='user'; pane=''">Back</button>
        <mapbox id="map" :access-token="mapboxToken" :map-options="mapOptions" @map-load="mapLoaded"></mapbox>
      </div>
      <div class="adminView" v-else>
        <input class="globalSearch" v-model="search" placeholder="Search Users...">
        <div class="user" v-for="user in users" v-bind:key="user.id">
          <h5 v-on:click="viewUser(user)">{{user.name}}</h5>
        </div>
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
      markerStart: document.createElement('div'),
      markerEnd: document.createElement('div'),
      coordinates: [0, 0],
      startCoordinates: [0, 0],
      endCoordinates: [0, 0],
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
      totalDistance: 0,
      search: '',
      userSearch: '',
      users: [],
      clocks: [],
      trips: [],
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
      activeTrip: {
        userId: '',
        distance: 0,
        start: {
          latitude: '',
          longitude: '',
          month: 0,
          day: 0,
          hour: 0,
          minute: 0,
          second: 0
        },
        end: {
          latitude: '',
          longitude: '',
          month: 0,
          day: 0,
          hour: 0,
          minute: 0,
          second: 0
        }
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
        vue.populateCompanyTrips()
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    viewUser (user) {
      let vue = this
      vue.totalHours = 0
      vue.totalDistance = 0
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
        })
        .catch(function (error) {
          console.log(error)
        })
      axios.get('http://54.186.69.46:81/trips/' + vue.activeUser.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          vue.trips = []
          vue.trips = response.data
          vue.countTrips()
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
      vue.totalHours = 0
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
        } else if (clockType === 'out' || clockType === 'lunch out') {
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
    populateCompanyTrips () {
      let vue = this
      vue.totalDistance = 0
      let i = 0
      vue.trips = []
      for (i = 0; i < vue.users.length; i++) {
        vue.activeUser.id = vue.users[i]._id
        axios.get('http://54.186.69.46:81/trips/' + vue.activeUser.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
          .then(function (response) {
            let j = 0
            for (j = 0; j < response.data.length; j++) {
              vue.trips.push(response.data[j])
              if (vue.trips.length === response.data.length) {
                vue.countTrips()
              }
            }
            vue.trips = []
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    countTrips () {
      let vue = this
      let i = 0
      for (i = 0; i < vue.trips.length; i++) {
        let distance = vue.trips[i].distance
        vue.totalDistance = vue.totalDistance + Math.floor(distance / 1609.34)
      }
    },
    viewTrip (trip) {
      let vue = this
      vue.activeTrip.userId = trip._id
      vue.activeTrip.distance = trip.distance
      vue.activeTrip.start.month = trip.start.month
      vue.activeTrip.start.day = trip.start.day
      vue.activeTrip.start.hour = trip.start.hour
      vue.activeTrip.start.minute = trip.start.minute
      vue.activeTrip.start.second = trip.start.second
      vue.activeTrip.end.month = trip.end.month
      vue.activeTrip.end.day = trip.end.day
      vue.activeTrip.end.hour = trip.end.hour
      vue.activeTrip.end.minute = trip.end.minute
      vue.activeTrip.end.second = trip.end.second
      vue.startCoordinates = [trip.start.longitude, trip.start.latitude]
      vue.endCoordinates = [trip.end.longitude, trip.end.latitude]
      vue.pane = 'readout'
      vue.modal = 'trip'
    },
    mapLoaded (map) {
      let vue = this
      vue.map = map
      if (vue.modal === 'clock') {
        vue.addMarker()
        vue.map.jumpTo({
          center: [vue.activeClock.longitude, vue.activeClock.latitude],
          zoom: 14
        })
      } else {
        vue.addMarkers()
        vue.map.jumpTo({
          center: vue.startCoordinates,
          zoom: 14
        })
      }
    },
    addMarker () {
      let vue = this
      new mapboxgl.Marker(vue.marker)
        .setLngLat(vue.coordinates)
        .addTo(vue.map)
    },
    addMarkers () {
      let vue = this
      new mapboxgl.Marker(vue.markerStart)
        .setLngLat(vue.startCoordinates)
        .addTo(vue.map)
      new mapboxgl.Marker(vue.markerEnd)
        .setLngLat(vue.endCoordinates)
        .addTo(vue.map)
    }
  },
  computed: {
    analyticsLogic: function () {
      let vue = this
      return {
        analytics: true,
        fixed: vue.modal === 'clock' || vue.modal === 'time'
      }
    }
  }
}
</script>

<style scoped lang="less">
@red: #c90c2e;
@grey: #323d38;

.fixed {
  position: fixed;
}

.analytics {
  display: grid;
  width: 100%;
  margin: 0;
  grid-template-rows: repeat(5, 100px);
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

#map {
  width: 100%;
  margin-top: 60% !important;
  height: 45% !important;
  z-index: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute !important;
}

.timeTab {
  grid-column-start: 1;
  grid-column-end: 3;
  text-align: center;
  background-color: @grey;
  height: 30px;
  color: #fff;
  width: 80%;
  margin-left: 10%;
  line-height: 25px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.mileTab {
  grid-column-start: 3;
  grid-column-end: 5;
  text-align: center;
  background-color: @grey;
  height: 30px;
  color: #fff;
  margin-left: 10%;
  line-height: 25px;
  width: 80%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.globalSearch {
  grid-row: 4;
  grid-column-start: 1;
  grid-column-end: 5;
  width: 100%;
  height: 40px;
  border: 1px solid black;

}
.graphsPane {
  margin-top: 10px;
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 5;
  border: 3px solid @red;
  border-radius: 5px;
  width: 96%;
  margin-left: 2%;
}

.modals {
  grid-row: 4;
  margin-top: -70px;
  grid-column-start: 1;
  grid-column-end: 5;
  width: 90%;
  margin-left: 5%;
}
.back {
  margin-top: 5px;
  width: 20%;
  color: #fff;
  height: 30px;
  font-size: 1.2em;
  font-weight: 400;
  background-color: @red;
  border: none;
  border-radius: 5px;
}
.mapBack {
  background-color: @red;
  color:  #fff;
  border: none;
  padding: 4px;
  width: 20%;
  position: fixed;
  border-radius: 5px;
}
h4 {
  font-size: 1em;
  color: @red;
  line-height: 10px;
  margin-left: 5%;
}
h5 {
  font-size: 1em;
  height: 20px;
  padding: 0px;
}
h3 {
  font-size: 1em;
  margin-left: 5%;
}
input {
  border: 1px solid #000;
  width: 100%;
  margin-top: 10px;
  height: 40px;
  padding-left: 5%;
  margin-bottom: 5%;
}
.user {
  width: 100%;
  border-bottom: 1px solid #000;
  padding-left: 5%;
  height: 30px;
}
.clocks {
  width: 100%;
  border: 1px solid black;
  padding-left: 5%;
}
.trips {
  width: 100%;
  border: 1px solid black;
  padding-left: 5%;
}

</style>
