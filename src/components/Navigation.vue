<template>
  <div>
    <md-toolbar id="navigation" class="md-primary">
      <div class="md-toolbar-section-start">
        <router-link to="/day"><h2 class="md-title">Stock Status</h2></router-link>
      </div>
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
