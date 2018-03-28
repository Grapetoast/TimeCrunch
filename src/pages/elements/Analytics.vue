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
        <div class="clockDay" v-bind:key="day.id" v-for="day in days" v-if="pane==='time'">
          <h5 v-on:click="day.visible = !day.visible"> {{(day.month + 1)}}/{{day.day}}</h5>
          <div class="clocks" v-bind:key="clock.id" v-for="clock in day.clocks" v-if="day.visible">
            <h5 v-on:click="viewClock(clock)">{{clock.clockType}} {{clock.hours}}:{{clock.minutes}}</h5>
          </div>
        </div>
        <div class="tripDay" v-bind:key="tripDay.id" v-for="tripDay in tripDays" v-if="pane===''">
          <h5 v-on:click="tripDay.visible = !tripDay.visible"> {{(tripDay.month + 1)}}/{{tripDay.day}}</h5>
          <div class="trips" v-bind:key="trip.id" v-for="trip in tripDay.trips" v-if="tripDay.visible">
            <h5 v-on:click="viewTrip(trip)"> Distance: {{Math.floor(trip.distance / 1609.34)}} Miles</h5>
          </div>
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
      tripMatch: false,
      dayMatch: false,
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
      days: [],
      activeClocks: [],
      tripDays: [],
      activeTrips: [],
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
          let j = 0
          for (j = 0; j < response.data.length; j++) {
            let q = 0
            for (q = 0; q < vue.days.length; q++) {
              if (vue.days[q].month === response.data[j].month && vue.days[q].day === response.data[j].day) {
                vue.dayMatch = true
                vue.activeClocks = vue.days[q].clocks
                let w = 0
                for (w = 0; w < vue.activeClocks.length; w++) {
                  if (vue.activeClocks[w].hours > response.data[j].hours) {
                    vue.days[q].clocks.splice((w), 0, response.data[j])
                    break
                  } else if (vue.activeClocks[w].hours === response.data[j].hours && vue.activeClocks[w].minutes > response.data[j].minutes) {
                    vue.days[q].clocks.splice((w), 0, response.data[j])
                    break
                  } else if (vue.activeClocks[w].hours === response.data[j].hours && vue.activeClocks[w].minutes === response.data[j].minutes) {
                    vue.days[q].clocks.splice((w), 0, response.data[j])
                    break
                  } else {
                    vue.days[q].clocks.push(response.data[j])
                    break
                  }
                }
              }
            }
            if (vue.dayMatch === true) {
              vue.dayMatch = false
            } else if (vue.days.length === 0) {
              vue.days.push({day: response.data[j].day, month: response.data[j].month, visible: false, clocks: [response.data[j]]})
            } else {
              let z = 0
              for (z = 0; z < vue.days.length; z++) {
                if (vue.days[z].month === response.data[j].month) {
                  if (vue.days[z].day > response.data[j].day) {
                    vue.days.splice((z), 0, {day: response.data[j].day, month: response.data[j].month, visible: false, clocks: [response.data[j]]})
                    break
                  }
                } else if (vue.days[z].month > response.data[j].month) {
                  vue.days.splice((z), 0, {day: response.data[j].day, month: response.data[j].month, visible: false, clocks: [response.data[j]]})
                  break
                } else {
                  vue.days.push({day: response.data[j].day, month: response.data[j].month, visible: false, clocks: [response.data[j]]})
                  break
                }
              }
            }
          }
          vue.countClocks()
        })
        .catch(function (error) {
          console.log(error)
        })
      axios.get('http://54.186.69.46:81/trips/' + vue.activeUser.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          vue.trips = []
          vue.trips = response.data
          let j = 0
          for (j = 0; j < response.data.length; j++) {
            if (vue.tripDays.length === 0) {
              vue.tripMatch = true
              let thing = response.data[j]
              console.log(vue.tripDays)
              vue.tripDays.push({day: thing.start.day, month: thing.start.month, visible: false, trips: [thing]})
              break
            }
            let q = 0
            for (q = 0; q < vue.tripDays.length; q++) {
              if (vue.tripDays[q].month === response.data[j].start.month && vue.tripDays[q].day === response.data[j].start.day) {
                vue.tripMatch = true
                vue.activeTrips = vue.tripDays[q].trips
                let w = 0
                for (w = 0; w < vue.activeTrips.length; w++) {
                  if (vue.activeTrips[w].start.hours > response.data[j].start.hours) {
                    vue.tripDays[q].trips.splice((w), 0, response.data[j])
                    break
                  } else if (vue.activeTrips[w].start.hours === response.data[j].start.hours && vue.activeTrips[w].start.minutes > response.data[j].start.minutes) {
                    vue.tripDays[q].trips.splice((w), 0, response.data[j])
                    break
                  } else if (vue.activeTrips[w].start.hours === response.data[j].start.hours && vue.activeTrips[w].start.minutes === response.data[j].start.minutes) {
                    vue.tripDays[q].trips.splice((w), 0, response.data[j])
                    break
                  } else {
                    vue.tripDays[q].trips.push(response.data[j])
                    break
                  }
                }
              }
            }
            if (vue.tripMatch === true) {
              vue.tripMatch = false
            } else {
              console.log(vue.tripDays[0].month)
              let z = 0
              for (z = 0; z < vue.tripDays.length; z++) {
                if (vue.tripDays[z].month === response.data[j].start.month) {
                  if (vue.tripDays[z].day > response.data[j].start.day) {
                    vue.tripDays.splice((z), 0, {day: response.data[j].start.day, month: response.data[j].start.month, visible: false, trips: [response.data[j]]})
                    break
                  }
                } else if (vue.tripDays[z].month > response.data[j].start.month) {
                  vue.tripDays.splice((z), 0, {day: response.data[j].start.day, month: response.data[j].start.month, visible: false, trips: [response.data[j]]})
                  break
                } else {
                  break
                }
              }
            }
          }
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
        fixed: vue.modal === 'clock' || vue.modal === 'time' || vue.modal === 'trip'
      }
    }
  }
}
</script>

<style scoped lang="less">
@red: #c90c2e;
@grey: #323d38;

.analytics {
  display: grid;
  width: 100%;
  margin: 0;
  grid-template-rows: repeat(5, 100px);
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.fixed {
  position: fixed;
}

#map {
  width: 100%;
  height: 260px;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed !important;
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
