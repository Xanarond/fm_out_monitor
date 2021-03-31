<template>
  <div id="charts">
    <b-container fluid="">
      <b-col>
        <h1>Chart Page</h1>
        <b-row>
          <b-col>
            <NightChartComponent/>
          </b-col>
        </b-row>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import NightChartComponent from "@/components/NightChartComponent";


export default {
  name: "NightShiftChartPage",
  components: {NightChartComponent}
}
</script>

<style scoped>
h1 {
  color: #ffffff;
}
</style>