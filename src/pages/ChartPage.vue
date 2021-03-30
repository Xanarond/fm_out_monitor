<template>
  <div id="charts">
    <HeaderComponent/>
    <b-container fluid="">
      <b-col>
        <h1>Chart Page</h1>
        <b-row>
          <b-col>
            <ChartComponent/>
          </b-col>
        </b-row>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";
import ChartComponent from "@/components/ChartComponent";

export default {
  name: "ChartPage",
  components: {ChartComponent, HeaderComponent}
}
</script>

<style scoped>
h1 {
  color: #ffffff;
}
</style>