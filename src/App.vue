<template>
  <transition>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script>

export default {
  name: 'App',
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
