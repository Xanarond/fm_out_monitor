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
h1 {
  color: #ffffff;
}

hr {
  border: 0 !important;
  border-top: 1px solid #acacac !important;
}

h3 {
  color: #acacac !important;
  font-size: 16px !important;
  margin: 0 !important;
}

</style>
