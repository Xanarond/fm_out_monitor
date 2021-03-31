<template>
  <div id="charts">
<!--    <HeaderComponent/>-->
    <b-container fluid="">
      <b-col>
        <h1>Day Shift</h1>
        <b-row>
          <b-col>
            <DayChartComponent/>
          </b-col>
        </b-row>
      </b-col>
    </b-container>
  </div>
</template>

<script>
// import HeaderComponent from "@/components/HeaderComponent";
import DayChartComponent from "@/components/DayChartComponent";

export default {
  name: "ChartPage",
  components: {DayChartComponent}
}
</script>

<style scoped>
h1 {
  color: #ffffff;
}
</style>