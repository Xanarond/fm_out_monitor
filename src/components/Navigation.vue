<template>
  <md-toolbar class="md-primary">
    <div class="md-toolbar-section-start">
      <a href="/"><h2 class="md-title">Outbound status Dashboard</h2></a>
    </div>
    <a href="/day">
      <md-button>Day Shift</md-button>
    </a>
    <a href="/night">
      <md-button class="md-primary">Night Shift</md-button>
    </a>
    <a href="/dayp"><md-button>Day Pivot</md-button></a>
    <a href="/nightp">
      <md-button class="md-accent">Night Pivot</md-button>
    </a>
  </md-toolbar>

</template>

<script>
export default {
  name: "Navigation"
}
</script>

<style scoped>

</style>