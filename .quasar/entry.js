/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding initialization code.
 * Use "quasar new plugin <name>" and add it there.
 * One plugin per concern. Then reference the file(s) in quasar.conf.js > plugins:
 * plugins: ['file', ...] // do not add ".js" extension to it.
 **/
import './quasar'

import Vue from 'vue'
Vue.config.productionTip = false


import 'quasar-extras/roboto-font'

import 'quasar-extras/material-icons'




import 'quasar-app-styl'


import 'src/css/app.styl'


import App from 'src/App'

import router from 'src/router'


const app = {
  el: '#q-app',
  router,

  ...App
}


const plugins = []

import pluginAxios from 'src/plugins/axios'
plugins.push(pluginAxios)

import pluginMapbox from 'src/plugins/mapbox'
plugins.push(pluginMapbox)

plugins.forEach(plugin => plugin({ app, router, Vue }))







  
    // Needed only for iOS
    import FastClick from 'fastclick'
    document.addEventListener('DOMContentLoaded', () => {
      FastClick.attach(document.body)
    }, false)
  
document.addEventListener('deviceready', () => {
Vue.prototype.$q.cordova = window.cordova



new Vue(app)



}, false) // on deviceready

