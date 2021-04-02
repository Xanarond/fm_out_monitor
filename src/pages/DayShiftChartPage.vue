<template>
  <div id="charts">
    <b-container fluid="">
      <b-col>
        <h1>Day Shift</h1>
        <b-row style="background: #605f5f">
          <b-col class="border-right h-75 mt-5">
            <b-row class="pt-5">
              <b-col class="m-auto"><h3>Shift Target</h3></b-col>
              <b-col>
                <div>
                  <hr/>
                </div>
              </b-col>
              <b-col cols="12">
                <h1 style="font-size: 90px;">3,000</h1>
              </b-col>
            </b-row>
            <b-row class="pt-5">
              <b-col class="m-auto"><h3>Complete</h3></b-col>
              <b-col>
                <div>
                  <hr/>
                </div>
              </b-col>
              <b-col cols="12">
                <h1 style="font-size: 90px;">1,645</h1>
              </b-col>
            </b-row>
            <b-row class="pt-5">
              <b-col class="m-auto"><h3>Progress Rate</h3></b-col>
              <b-col>
                <div>
                  <hr/>
                </div>
              </b-col>
              <b-col cols="12">
                <h1 style="font-size: 90px;">54,9%</h1>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="9">
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

</style>