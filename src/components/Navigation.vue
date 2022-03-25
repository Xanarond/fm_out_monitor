<template>
  <div>
    <md-toolbar id="navigation" class="md-primary">
      <div class="md-toolbar-section-start">
        <router-link to="/"><h2 class="md-title">Outbound status Dashboard</h2></router-link>
      </div>
      <md-menu md-align-trigger md-size="auto">
        <md-button md-menu-trigger>Packing</md-button>
        <md-menu-content>
          <md-menu-item to="/day">
            Day Shift
          </md-menu-item>
          <md-menu-item to="/night">Night Shift</md-menu-item>
        </md-menu-content>
      </md-menu>
      <md-menu md-align-trigger md-size="auto">
        <md-button md-menu-trigger>Picking</md-button>
        <md-menu-content>
          <md-menu-item to="/dayp">
            Day Shift
          </md-menu-item>
          <md-menu-item to="/nightp">
            Night Shift
          </md-menu-item>
        </md-menu-content>
      </md-menu>
      <md-menu class="pr-1" md-align-trigger md-size="auto">
        <md-button md-menu-trigger>Progress</md-button>
        <md-menu-content>
          <md-menu-item to="/monitor">
            Monitoring
          </md-menu-item>
        </md-menu-content>
      </md-menu>
      <md-menu class="pr-1" md-align-trigger md-size="auto">
        <md-button md-menu-trigger>PGI</md-button>
        <md-menu-content>
          <md-menu-item to="/pick_task">
            Pick Task
          </md-menu-item>
          <md-menu-item to="/pgi_np">
            PGI Not Picked
          </md-menu-item>
        </md-menu-content>
      </md-menu>
      <md-menu class="pr-1" md-align-trigger md-size="auto">
        <md-button md-menu-trigger>INBOUND</md-button>
        <md-menu-content>
          <md-menu-item to="/inbound">
            Inbound Dashboard
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
