webpackJsonp([1],{EZmi:function(t,o,n){var e=n("kxFB");(t.exports=n("FZ+f")(!1)).push([t.i,"\n.timecrunch {\n  position: fixed;\n  width: 100%;\n  margin-top: 78px;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: (1fr)[4];\n      grid-template-columns: repeat(4, 1fr);\n  -ms-grid-rows: (100px)[7];\n      grid-template-rows: repeat(7, 100px);\n}\n.prettyModal {\n  position: absolute;\n  z-index: 12;\n  background-color: #c90c2e;\n  border-radius: 10px;\n  width: 80%;\n  height: 80%;\n  margin-left: 10%;\n}\n#map {\n  width: 100%;\n  height: 100%;\n  margin-top: 50px;\n  padding-top: none;\n  -ms-grid-row: 2;\n      grid-row-start: 2;\n  grid-row-end: 7;\n  -ms-grid-column: 1;\n      grid-column-start: 1;\n  grid-column-end: 7;\n  z-index: 0;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n}\n.mapboxgl-marker {\n  background-image: url("+e(n("Jrrv"))+");\n  background-size: cover;\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  z-index: 4;\n  cursor: pointer;\n}\n.success {\n  position: absolute;\n  z-index: 12;\n  background-color: #323d38;\n  width: 100%;\n  height: 160px;\n  top: 0;\n}\n.clock {\n  position: relative;\n  z-index: 2;\n  text-align: center;\n  font-size: 4em;\n  -ms-grid-row: 1;\n      grid-row-start: 1;\n  grid-row-end: 1;\n  -ms-grid-column: 1;\n      grid-column-start: 1;\n  grid-column-end: 7;\n  background-color: #c90c2e;\n  padding-top: 20px;\n  line-height: 80px;\n  color: #fff;\n  box-shadow: 0px 1.5px 5px #000;\n}\n.clockIn {\n  z-index: 3;\n  font-size: .8em;\n  font-weight: bold;\n  text-align: center;\n  width: 100%;\n  height: 50px;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  background-color: #323d38;\n  -ms-grid-row: 2;\n      grid-row: 2;\n  -ms-grid-column: 1;\n      grid-column: 1;\n  color: white;\n  line-height: 50px;\n  box-shadow: 0px 1.5px 5px #000;\n}\n.lunchIn {\n  z-index: 3;\n  font-size: .8em;\n  font-weight: bold;\n  text-align: center;\n  width: 100%;\n  height: 50px;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  background-color: #323d38;\n  -ms-grid-row: 2;\n      grid-row: 2;\n  -ms-grid-column: 3;\n      grid-column: 3;\n  color: white;\n  line-height: 50px;\n  box-shadow: 0px 1.5px 5px #000;\n}\n.lunchOut {\n  z-index: 3;\n  color: white;\n  font-size: .8em;\n  font-weight: bold;\n  text-align: center;\n  width: 100%;\n  height: 50px;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  background-color: #323d38;\n  -ms-grid-row: 2;\n      grid-row: 2;\n  -ms-grid-column: 2;\n      grid-column: 2;\n  line-height: 50px;\n  box-shadow: 0px 1.5px 5px #000;\n}\n.clockOut {\n  z-index: 3;\n  color: white;\n  font-size: .8em;\n  font-weight: bold;\n  text-align: center;\n  width: 100%;\n  height: 50px;\n  line-height: 50px;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  background-color: #323d38;\n  -ms-grid-row: 2;\n      grid-row: 2;\n  -ms-grid-column: 4;\n      grid-column: 4;\n  box-shadow: 0px 1.5px 5px #000;\n}\n.prettyModal {\n  color: #fff;\n  background-color: #323d38;\n  height: 130px;\n  font-size: 1em;\n  margin-top: 160px;\n  box-shadow: 1px 1px 1px #323d38;\n}\n.prettyModal h2 {\n  font-size: 1.5em;\n  text-align: center;\n}\n.back {\n  color: #fff;\n}\n.success {\n  color: #fff;\n  background-color: #323d38;\n  height: 100px;\n  margin-top: 160px;\n  width: 80%;\n  margin-left: 10%;\n  border-radius: 5px;\n  font-size: 1em;\n  box-shadow: 1px 1px 1px #323d38;\n}\n.success h4 {\n  font-size: 1.5em;\n  text-align: center;\n}\n",""])},Jrrv:function(t,o){t.exports="data:image/png;base64,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"},dqTT:function(t,o,n){var e;e=function(){return function(t){var o={};function n(e){if(o[e])return o[e].exports;var i=o[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=o,n.i=function(t){return t},n.d=function(t,o,e){n.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(o,"a",o),o},n.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},n.p="",n(n.s=3)}([function(t,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default={data:function(){return{}},props:{accessToken:{type:String,required:!0},mapOptions:{type:Object,required:!0},navControl:{type:Object,default:function(){return{show:!0,position:"top-right"}}},geolocateControl:{type:Object,default:function(){return{show:!1,position:"top-left",options:{}}}},scaleControl:{type:Object,default:function(){return{show:!1,position:"top-left",options:{}}}},fullscreenControl:{type:Object,default:function(){return{show:!1,position:"top-right"}}}},mounted:function(){var t=this.mapInit();this.addControls(t),this.registerEvents(t)},methods:{mapInit:function(){mapboxgl.accessToken=this.accessToken,this.mapOptions.hasOwnProperty("container")||(this.mapOptions.container="map");var t=new mapboxgl.Map(this.mapOptions);return this.$emit("map-init",t),t},registerEvents:function(t){var o=this;t.on("load",function(){o.$emit("map-load",t)}),t.on("mousemove",function(n){o.$emit("map-mousemove",t,n)}),t.on("click",function(n){o.$emit("map-click",t,n)}),t.on("contextmenu",function(n){o.$emit("map-contextmenu",t,n)}),t.on("resize",function(){o.$emit("map-resize",t)}),t.on("resize",function(n){o.$emit("map-webglcontextlost",t,n)}),t.on("resize",function(n){o.$emit("map-webglcontextrestored",t,n)}),t.on("remove",function(){o.$emit("map-remove",t)}),t.on("sourcedataloading",function(n){o.$emit("map-sourcedataloading",t,n)}),t.on("touchstart",function(n){o.$emit("map-touchstart",t,n)}),t.on("movestart",function(n){o.$emit("map-movestart",t,n)}),t.on("movestart",function(n){o.$emit("map-movestart",t,n)}),t.on("move",function(n){o.$emit("map-move",t,n)}),t.on("moveend",function(n){o.$emit("map-moveend",t,n)}),t.on("error",function(n){o.$emit("map-error",t,n)}),t.on("data",function(n){o.$emit("map-data",t,n)}),t.on("styledata",function(n){o.$emit("map-styledata",t,n)}),t.on("mouseup",function(n){o.$emit("map-mouseup",t,n)}),t.on("touchcancel",function(n){o.$emit("map-touchcancel",t,n)}),t.on("sourcedata",function(n){o.$emit("map-sourcedata",t,n)}),t.on("dataloading",function(n){o.$emit("map-dataloading",t,n)}),t.on("styledataloading",function(n){o.$emit("map-styledataloading",t,n)}),t.on("dblclick",function(n){o.$emit("map-dblclick",t,n)}),t.on("render",function(){o.$emit("map-render",t)}),t.on("mouseout",function(n){o.$emit("map-mouseout",t,n)}),t.on("mousedown",function(n){o.$emit("map-mousedown",t,n)}),t.on("touchend",function(n){o.$emit("map-touchend",t,n)}),t.on("zoomstart",function(n){o.$emit("map-zoomstart",t,n)}),t.on("zoomend",function(n){o.$emit("map-zoomend",t,n)}),t.on("zoom",function(n){o.$emit("map-zoom",t,n)}),t.on("boxzoomcancel",function(n){o.$emit("map-boxzoomcancel",t,n)}),t.on("boxzoomend",function(n){o.$emit("map-boxzoomend",t,n)}),t.on("boxzoomstart",function(n){o.$emit("map-boxzoomstart",t,n)}),t.on("rotatestart",function(n){o.$emit("map-rotatestart",t,n)}),t.on("rotate",function(n){o.$emit("map-rotate",t,n)}),t.on("rotateend",function(n){o.$emit("map-rotateend",t,n)}),t.on("dragend",function(n){o.$emit("map-dragend",t,n)}),t.on("drag",function(n){o.$emit("map-drag",t,n)}),t.on("dragstart",function(n){o.$emit("map-dragstart",t,n)}),t.on("pitch",function(n){o.$emit("map-pitch",t,n)}),t.on("pitchstart",function(n){o.$emit("map-pitchstart",t,n)}),t.on("pitchend",function(n){o.$emit("map-pitchend",t,n)})},addControls:function(t){if(this.navControl.show){var o=new mapboxgl.NavigationControl;t.addControl(o,this.navControl.position)}if(this.geolocateControl.show){var n=new mapboxgl.GeolocateControl(this.geolocateControl.options);t.addControl(n,this.geolocateControl.position)}if(this.scaleControl.show){var e=new mapboxgl.ScaleControl(this.scaleControl.options);t.addControl(e,this.scaleControl.position)}if(this.fullscreenControl.show){var i=new mapboxgl.FullscreenControl;t.addControl(i,this.fullscreenControl.position)}}}}},function(t,o){t.exports=function(t,o,n,e,i,a){var r,c=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(r=t,c=t.default);var l,d="function"==typeof c?c.options:c;if(o&&(d.render=o.render,d.staticRenderFns=o.staticRenderFns,d._compiled=!0),n&&(d.functional=!0),i&&(d._scopeId=i),a?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),e&&e.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},d._ssrRegister=l):e&&(l=e),l){var u=d.functional,p=u?d.render:d.beforeCreate;u?(d._injectStyles=l,d.render=function(t,o){return l.call(o),p(t,o)}):d.beforeCreate=p?[].concat(p,l):[l]}return{esModule:r,exports:c,options:d}}},function(t,o,n){"use strict";var e=function(){var t=this.$createElement;return(this._self._c||t)("div",{attrs:{id:this.mapOptions.hasOwnProperty("container")?this.mapOptions.container:"map"}})};e._withStripped=!0;var i={render:e,staticRenderFns:[]};o.a=i},function(t,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=n(0),i=n.n(e),a=n(2),r=n(1)(i.a,a.a,!1,null,null,null);r.options.__file="src/components/Mapbox.vue",r.esModule&&Object.keys(r.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.default=r.exports}])},t.exports=e()},z6uv:function(t,o,n){var e=n("EZmi");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);(0,n("rjj0").default)("640c8da0",e,!1,{})},ztCX:function(t,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=n("dqTT"),i=n.n(e),a=n("1e2d"),r=n.n(a),c=n("mtWM"),s=n.n(c),l={name:"timecrunch",props:["logged","user"],components:{mapbox:i.a},created:function(){var t=this;!1===this.logged&&this.$router.push("/login"),s.a.get("http://54.186.69.46:81/users/"+t.user.id,{headers:{Authorization:"JWT "+t.user.token}}).then(function(o){t.lastClockType=o.data.lastClockType}).catch(function(t){console.log(t)}),t.userId=t.user.id,navigator.geolocation.getCurrentPosition(function(o){t.latitude=o.coords.latitude,t.longitude=o.coords.longitude,t.altitude=o.coords.altitude,t.accuracy=o.coords.accuracy,t.altitudeAccuracy=o.coords.altitudeAccuracy,t.coordinates=[t.longitude,t.latitude]},function(){t.prettyModal("It seems we cant find you, please reload the page and try again."),this.locationError=!0})},data:function(){return{marker:document.createElement("div"),modal:"",prettyMessage:"",endMarker:document.createElement("div"),userId:"",time:"",month:"",day:"",hours:"",minutes:"",seconds:"",clockType:"",lastClockType:"",distance:0,latitude:"",longitude:"",coordinates:[0,0],endcoordinates:[-112,34],altitude:"",accuracy:"",altitudeAccuracy:"",mapboxToken:"pk.eyJ1IjoiZ3JhcGV0b2FzdCIsImEiOiJjajhkeHR5YzEwdXp4MnpwbWhqYzI4ejh0In0.JzUlf5asD6yOa5XvjUF5Ag",mapOptions:{container:"map",style:"mapbox://styles/mapbox/streets-v9",center:[0,0],zoom:1}}},methods:{prettyModal:function(t){this.prettyMessage=t,this.modal="pretty"},submitDirections:function(){s.a.get("https://api.mapbox.com/directions/v5/mapbox/driving/-112.399444,33.613509;-112,34?geometries=geojson&access_token=pk.eyJ1IjoiZ3JhcGV0b2FzdCIsImEiOiJjajhkeHR5YzEwdXp4MnpwbWhqYzI4ejh0In0.JzUlf5asD6yOa5XvjUF5Ag",{})},getDirections:function(){var t=this;s.a.get("https://api.mapbox.com/directions/v5/mapbox/driving/-112.399444,33.613509;-112,34?geometries=geojson&access_token=pk.eyJ1IjoiZ3JhcGV0b2FzdCIsImEiOiJjajhkeHR5YzEwdXp4MnpwbWhqYzI4ejh0In0.JzUlf5asD6yOa5XvjUF5Ag").then(function(o){t.distance=o.data.routes[0].distance}).catch(function(t){console.log(t)})},mapLoaded:function(t){this.map=t,this.map.jumpTo({center:[this.longitude,this.latitude],zoom:15}),this.startMarker(),this.endMarkerMethod(),this.getDirections()},mapJump:function(){this.map.jumpTo({center:[this.longitude,this.latitude],zoom:15})},startMarker:function(){new r.a.Marker(this.marker).setLngLat(this.coordinates).addTo(this.map)},updateLastClockType:function(){var t=this;s.a.put("http://54.186.69.46:81/users/"+t.user.id,{lastClockType:t.lastClockType},{headers:{Authorization:"JWT "+t.user.token}}).then(function(o){t.modal="success"}).catch(function(t){console.log(t)})},endMarkerMethod:function(){new r.a.Marker(this.endMarker).setLngLat(this.endcoordinates).addTo(this.map)},clock:function(){var t=this;navigator.geolocation.getCurrentPosition(t.locationSuccess,t.locationFail),this.time=new Date,t.month=t.time.getMonth(),t.day=t.time.getDate(),t.hours=t.time.getHours(),t.minutes=t.time.getMinutes(),t.seconds=t.time.getSeconds(),s.a.post("http://54.186.69.46:81/clocks",{userId:t.userId,clockType:t.clockType,month:t.month,day:t.day,hours:t.hours,minutes:t.minutes,seconds:t.seconds,latitude:t.latitude,longitude:t.longitude,altitude:t.altitude}).then(function(){t.lastClockType=t.clockType,t.updateLastClockType()}).catch(function(t){console.log(t)})},locationSuccess:function(t){this.latitude=t.coords.latitude,this.longitude=t.coords.longitude,this.altitude=t.coords.altitude,this.accuracy=t.coords.accuracy,this.altitudeAccuracy=t.coords.altitudeAccuracy},locationFail:function(){this.prettyModal("It seems we cant find you, please reload the page and try again."),this.locationError=!0},clockIn:function(){"out"===this.lastClockType?(this.clockType="in",this.clock()):this.prettyModal("You are already clocked in!")},clockOut:function(){"in"===this.lastClockType||"lunch in"===this.lastClockType?(this.clockType="out",this.clock()):"lunch out"===this.lastClockType?this.prettyModal("You are out to lunch!"):this.prettyModal("You are not clocked in!")},lunchOut:function(){"in"===this.lastClockType?(this.clockType="lunch out",this.clock()):"lunch out"===this.lastClockType?this.prettyModal("You are already out to lunch!"):"lunch in"===this.lastClockType?this.prettyModal("You already had lunch!"):this.prettyModal("You are not clocked in!")},lunchIn:function(){"lunch out"===this.lastClockType?(this.clockType="lunch in",this.clock()):"out"===this.lastClockType?this.prettyModal("You are not clocked in!"):"in"===this.lastClockType?this.prettyModal("You never clocked off for lunch!"):this.prettyModal("You are already back from lunch!")}}};setInterval(function(){function t(t){return t<10&&(t="0"+t),t}this.time=new Date,this.hours=this.time.getHours(),this.minutes=this.time.getMinutes(),this.seconds=this.time.getSeconds(),document.querySelectorAll(".clock")[0].innerHTML=t(this.hours)+":"+t(this.minutes)+":"+t(this.seconds)},1e3);var d=function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{staticClass:"timecrunch"},[n("div",{staticClass:"clock"}),t._v(" "),"success"===t.modal?n("div",{staticClass:"success"},[n("h4",[t._v("Clocked "+t._s(t.lastClockType))]),t._v(" "),n("button",{staticClass:"back",on:{click:function(o){t.modal=""}}},[t._v("Back")])]):"pretty"===t.modal?n("div",{staticClass:"prettyModal"},[n("h2",[t._v(t._s(t.prettyMessage))]),t._v(" "),n("button",{staticClass:"back",on:{click:function(o){t.modal=""}}},[t._v("Back")])]):t._e(),t._v(" "),n("div",{staticClass:"clockIn",on:{click:t.clockIn}},[t._v(" Clock In")]),t._v(" "),n("div",{staticClass:"clockOut",on:{click:t.clockOut}},[t._v("Clock Out")]),t._v(" "),n("div",{staticClass:"lunchOut",on:{click:t.lunchOut}},[t._v("Lunch Start")]),t._v(" "),n("div",{staticClass:"lunchIn",on:{click:t.lunchIn}},[t._v("Lunch End")]),t._v(" "),n("mapbox",{attrs:{id:"map","access-token":t.mapboxToken,"map-options":t.mapOptions},on:{"map-load":t.mapLoaded}})],1)},u=[];d._withStripped=!0;var p=n("XyMi"),m=!1;var h=function(t){m||n("z6uv")},f=Object(p.a)(l,d,u,!1,h,null,null);f.options.__file="src\\pages\\TimeCrunch.vue";o.default=f.exports}});