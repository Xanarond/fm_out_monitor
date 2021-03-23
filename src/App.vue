<template>
  <div id="app">
    <HeaderComponent/>
    <TableComponent/>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";
import TableComponent from "@/components/TableComponent";

export default {
  name: 'App',
  components: {
    TableComponent,
    HeaderComponent,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
html body{
  background-color: #262626;
}
</style>
