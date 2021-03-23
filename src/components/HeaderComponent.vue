<template>
  <div id="header_app">
    <div class="header">
      <h2>Outbound status Dashboard</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent"
}
</script>

<style scoped>
.header{
  background-color: #2c5292;
  border-bottom: 2px solid #000000;
  color: #fff;
}
@media screen and (min-width: 2280px) {
  .header h2 {
    font-size: 80px;
  }
}

@media screen and (min-width: 1280px) {
  .header h2 {
    font-size: 30px;
  }
}
</style>