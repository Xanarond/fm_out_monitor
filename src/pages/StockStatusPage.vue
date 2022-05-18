<template>
  <b-container
      fluid class="pt-2 pb-3">
    <b-row>
      <b-col><b-card-title class="pl-2">Zone</b-card-title></b-col>
      <b-col><b-card-title class="pl-5">Product</b-card-title></b-col>
    </b-row>
    <b-row>
      <b-col class="justify-content-start pl-5"><WaffleChart/></b-col>
      <b-col class="justify-content-start"><BarChart/></b-col>
    </b-row>
  </b-container>
</template>

<script>
import WaffleChart from "../components/WaffleChart";
import BarChart from "../components/BarChart";

export default {
  name: "StockStatusPage",
  components: { WaffleChart, BarChart },
};
</script>

<style scoped>

</style>
