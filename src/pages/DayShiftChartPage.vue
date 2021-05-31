<template>
  <div id="charts">
    <b-container fluid="">
      <b-col>
        <h1>Day Shift</h1>
        <b-row style="background: #605f5f">
          <b-col>
            <DayChartComponent/>
          </b-col>
        </b-row>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import DayChartComponent from "../components/DayChartComponent";

export default {
  name: "ChartPage",
  components: {DayChartComponent}
}
</script>

<style scoped>

</style>