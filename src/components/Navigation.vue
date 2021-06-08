<template>
  <div>
    <md-toolbar id="navigation" class="md-primary">
      <div class="md-toolbar-section-start">
        <a href="/"><h2 class="md-title">Outbound status Dashboard</h2></a>
      </div>
      <md-menu md-align-trigger md-size="auto">
        <md-button md-menu-trigger>Packing</md-button>
        <md-menu-content>
          <md-menu-item href="/day">
            Day Shift
          </md-menu-item>
          <md-menu-item href="/night">Night Shift</md-menu-item>
        </md-menu-content>
      </md-menu>
      <md-menu md-align-trigger md-size="auto">
        <md-button md-menu-trigger>Picking</md-button>
        <md-menu-content>
          <md-menu-item href="/dayp">
            Day Shift
          </md-menu-item>
          <md-menu-item href="/nightp">
            Night Shift
          </md-menu-item>
        </md-menu-content>
      </md-menu>
      <md-menu class="pr-1" md-align-trigger md-size="auto">
        <md-button md-menu-trigger>Progress</md-button>
        <md-menu-content>
          <md-menu-item href="/monitor">
            Monitoring
          </md-menu-item>
          <md-menu-item to="/status">
            Status
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-toolbar>
    <!--    <div class="align-content-end">
          <md-button class="align-content-end">Show</md-button>
        </div>-->
  </div>
</template>

<script>
export default {
  name: 'Navigation',
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000;
}

/*#navigation{
  display: none;
}
#navigation:hover{
  display: block;
}*/
</style>
