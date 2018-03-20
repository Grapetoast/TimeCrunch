<template>
  <q-layout>
    <router-view :user="user"/>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  props: ['user'],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
