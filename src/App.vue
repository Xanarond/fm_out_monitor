<template>
  <div id="app">
    <Navigation/>
    <div>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>

import Navigation from "@/components/Navigation";
export default {
  name: 'App',
  components: {Navigation},
}
</script>

<style>
html body {
  background-color: #262626;
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
