webpackJsonp([6],{"+nwc":function(t,e){},0:function(t,e,o){t.exports=o("nplA")},"3Puz":function(t,e){},IafT:function(t,e){},N12Q:function(t,e){},R58i:function(t,e){},RxSf:function(t,e){},nplA:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("Dd8w"),i=o.n(n),a=(o("30VO"),o("/5sW")),r=o("7109");a.a.use(r.q,{components:{QLayout:r.g,QLayoutHeader:r.i,QLayoutDrawer:r.h,QPageContainer:r.m,QPage:r.l,QToolbar:r.n,QToolbarTitle:r.o,QBtn:r.b,QIcon:r.c,QList:r.j,QListHeader:r.k,QItem:r.d,QItemMain:r.e,QItemSide:r.f},directives:{Ripple:r.p},plugins:{Notify:r.a}});o("L4dm"),o("hAPP"),o("3Puz"),o("N12Q");var s=o("mtWM"),c=o.n(s),u={name:"navbar",props:["logged","user"],data:function(){return{toggled:!1,isToggled:!1,first:!0}},methods:{navToggle:function(){window.innerWidth<700?!1===this.toggled?(this.toggled=!0,this.isToggled=!0,this.first=!1):!0===this.toggled&&(this.toggled=!1,this.isToggled=!1):this.$router.push("/")}},computed:{nvLogic:function(){return{nv:!0,navButtonAnimation:this.isToggled,navButtonAnimationExit:!this.isToggled&&!this.first}},navpaneLogic:function(){return{navpane:this.first,navpaneAnimation:this.isToggled,navpaneAnimationExit:!this.isToggled&&!this.first}}}},d=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"main"},[o("div",{staticClass:"navbar"},[o("div",{staticClass:"logo",on:{click:function(e){t.$router.push("/")}}}),t._v(" "),o("div",{class:t.nvLogic,on:{click:t.navToggle}}),t._v(" "),o("div",{class:t.navpaneLogic},[t.logged?o("button",{staticClass:"Home",on:{click:function(e){t.navToggle(),t.$router.push("/")}}},[t._v("Home")]):t._e(),t._v(" "),t.logged?t._e():o("button",{staticClass:"Login",on:{click:function(e){t.navToggle(),t.$router.push("/Login")}}},[t._v("Login")]),t._v(" "),t.logged?t._e():o("button",{staticClass:"Reg",on:{click:function(e){t.navToggle(),t.$router.push("/Register")}}},[t._v("Register")]),t._v(" "),t.logged?o("button",{staticClass:"Account",on:{click:function(e){t.navToggle(),t.$router.push("/Account"),t.$emit("account")}}},[t._v("Account")]):t._e(),t._v(" "),t.logged?o("button",{staticClass:"Logout",on:{click:function(e){t.navToggle(),t.$emit("logout")}}},[t._v("Logout")]):t._e()])])])},l=[];d._withStripped=!0;var p=o("XyMi"),g=!1;var h=function(t){g||o("IafT")},m=Object(p.a)(u,d,l,!1,h,"data-v-ffa1b2f2",null);m.options.__file="src\\pages\\elements\\Navbar.vue";var f={name:"app",components:{navbar:m.exports},created:function(){this.user.token=localStorage.getItem("token"),this.user.id=localStorage.getItem("userId"),this.user.companyId=localStorage.getItem("companyId"),this.user.admin=Boolean(localStorage.getItem("admin")),null!==this.user.token&&(this.logged=!0)},data:function(){return{modal:"",accountView:"",prettyMessage:"",logged:!1,lastClockType:"",user:{id:"",token:"",companyId:"",admin:!1},distance:0,latitude:"",longitude:"",firstStarted:!0,tripStarted:!1,coordinates:[0,0],pastCoordinates:[0,0],time:"",trip:{userId:"",distance:0,start:{startCoordinates:[0,0],latitude:"",longitude:"",day:0,month:0,hour:0,minute:0,second:0},end:{endCoordinates:[0,0],latitude:"",longitude:"",day:0,month:0,hour:0,minute:0,second:0}},mapboxToken:"pk.eyJ1IjoiZ3JhcGV0b2FzdCIsImEiOiJjajhkeHR5YzEwdXp4MnpwbWhqYzI4ejh0In0.JzUlf5asD6yOa5XvjUF5Ag"}},methods:{prettyModal:function(t){this.prettyMessage=t,this.modal="pretty"},account:function(t){this.accountView=t||""},log:function(t){null!==t.token?(this.user.token=t.token,this.user.id=t.id,this.user.admin=t.admin,this.user.companyId=t.companyId,this.logged=!0,this.$router.push("/")):this.logged=!1},register:function(t){null!==t.token?(this.user.token=t.data.token,this.user.id=t.data.id,this.user.admin=t.data.admin,this.logged=!0,window.subscribe(this.user.token,this.user.companyId),this.$router.push("/")):this.logged=!1},logOut:function(){this.user.token="",this.user.id="",this.user.admin=!1,this.logged=!1,localStorage.removeItem("token"),localStorage.removeItem("userId"),localStorage.removeItem("admin"),this.$router.push("/login")},mileageLogic:function(){this.prettyModal("logic"),!0===this.firstStarted?navigator.geolocation.getCurrentPosition(this.locationSuccess,this.locationFail):"out"!==this.lastClockType&&(this.pastCoordinates=this.coordinates,navigator.geolocation.getCurrentPosition(this.mileageLocationSuccess,this.locationFail))},locationSuccess:function(t){this.coordinates=[t.coords.longitude.toPrecision(6),t.coords.latitude.toPrecision(5)],this.pastCoordinates=this.coordinates,this.firstStarted=!1},mileageLocationSuccess:function(t){var e=this;e.coordinates=[t.coords.longitude.toPrecision(6),t.coords.latitude.toPrecision(5)],!1===e.tripStarted?e.pastCoordinates[0]===e.coordinates[0]&&e.pastCoordinates[1]===e.coordinates[1]||(e.trip.start.startCoordinates=e.pastCoordinates,e.time=new Date,e.trip.start.month=e.time.getMonth(),e.trip.start.day=e.time.getDay(),e.trip.start.hour=e.time.getHours(),e.trip.start.minute=e.time.getMinutes(),e.trip.start.second=e.time.getSeconds(),e.trip.start.latitude=e.pastCoordinates[0],e.trip.start.longitude=e.pastCoordinates[1],e.tripStarted=!0,e.prettyModal("trip started")):!0===e.tripStarted&&e.pastCoordinates[0]===e.coordinates[0]&&e.pastCoordinates[1]===e.coordinates[1]&&(e.trip.end.endCoordinates=e.coordinates,e.time=new Date,e.trip.end.month=e.time.getMonth(),e.trip.end.day=e.time.getDay(),e.trip.end.hour=e.time.getHours(),e.trip.end.minute=e.time.getMinutes(),e.trip.end.second=e.time.getSeconds(),e.trip.end.latitude=e.coordinates[0],e.trip.end.longitude=e.coordinates[1],e.trip.userId=e.user.id,e.getDirections(),e.postTrip(),e.prettyModal("trip ended"),e.tripStarted=!1)},locationFail:function(){this.prettyModal("It seems we cant find you, please reload the page and try again."),this.locationError=!0},getDirections:function(){var t=this;c.a.get("https://api.mapbox.com/directions/v5/mapbox/driving/"+t.trip.start.startCoordinates+";"+t.trip.end.endCoordinates+"?geometries=geojson&access_token="+t.mapboxToken).then(function(e){t.trip.distance=e.data.routes[0].distance}).catch(function(t){console.log(t)})},postTrip:function(){var t=this;c.a.post("http://54.186.69.46:81/trips",{userId:t.user.id,start:{latitude:t.trip.start.latitude,longitude:t.trip.start.longitude,month:t.trip.start.month,day:t.trip.start.day,hour:t.trip.start.hour,minute:t.trip.start.minute,second:t.trip.start.second},end:{latitude:t.trip.end.latitude,longitude:t.trip.end.longitude,month:t.trip.end.month,day:t.trip.end.day,hour:t.trip.end.hour,minute:t.trip.end.minute,second:t.trip.end.second},distance:t.trip.distance}).then(function(e){t.prettyModal("trip Success!!")}).catch(function(t){console.log(t)})},onDeviceReady:function(){try{cordova.plugins.backgroundMode.enable()}catch(t){this.prettyModal("Failed to enable Background Mode, please review settings and restart app.")}this.tripLogic()},tripLogic:function(){var t=this;setInterval(function(){t.mileageLogic()},3e4),t.$router.push("/")}}},v=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"q-app"}},[o("navbar",{attrs:{logged:t.logged,user:t.user},on:{logout:t.logOut,account:t.account}}),t._v(" "),"pretty"===t.modal?o("div",{staticClass:"prettyModal"},[o("h2",[t._v(t._s(t.prettyMessage))]),t._v(" "),o("button",{staticClass:"prettyBack",on:{click:function(e){t.modal=""}}},[t._v("Back")])]):t._e(),t._v(" "),o("router-view",{attrs:{logged:t.logged,user:t.user,accountView:t.accountView},on:{login:t.log,register:t.register,account:t.account}})],1)},y=[];v._withStripped=!0;var b=!1;var _=function(t){b||o("RxSf")},k=Object(p.a)(f,v,y,!1,_,null,null);k.options.__file="src\\App.vue";var C=k.exports,I=o("/ocq"),S=[{path:"/",component:function(){return o.e(0).then(o.bind(null,"ztCX"))}},{path:"/Login",component:function(){return o.e(2).then(o.bind(null,"P7ry"))}},{path:"/Register",component:function(){return o.e(3).then(o.bind(null,"S2NW"))}},{path:"/Account",component:function(){return o.e(1).then(o.bind(null,"bJZN"))}},{path:"*",component:function(){return o.e(4).then(o.bind(null,"c5Mg"))}}];a.a.use(I.a);var w=new I.a({mode:"history",base:"/",scrollBehavior:function(){return{y:0}},routes:S});window.mapboxgl=o("1e2d");var T=o("//Fk"),M=o.n(T),L=null;a.a.config.productionTip=!1;var Q=i()({el:"#q-app",router:w},C),$=[];$.push(function(t){t.Vue.prototype.$axios=c.a}),$.push(function(t){t.app,t.router,t.Vue}),$.push(function(t){t.app,t.router;var e="Stripe",o="https://js.stripe.com/v3/";t.Vue.prototype.$Stripe=function(){return L||(L=new M.a(function(t,n){if(document.getElementById(e))console.error("Error loading "+o+" async: "+e+" is not unique");else{var i=document.createElement("script");i.src=o,i.async=!0,i.id=e,i.onload=function(){t()},i.onerror=function(t){n(t)},document.body.appendChild(i)}})),L}}),$.forEach(function(t){return t({app:Q,router:w,Vue:a.a})}),new a.a(Q)}},[0]);