<template>
  <div id="chart">
    <b-container fluid="">
      <b-row class="justify-content-center mt-2">
        <div class="d-inline-block  mt-auto mb-auto" style="color: #fff">Period:</div>
        <VueCtkDateTimePicker  :dark=true :label="'Select Date'" :noButton=true
                              :noHeader=true :noValueToCustomElem=true
                              :onlyDate=true class="justify-content-start d-inline-block mt-auto mb-auto"
                              formatted="L"
                              style="width: 380px;margin:0 5px 5px;"/>
        <button class="d-inline-block ml-1 mt-auto mb-auto btn btn-secondary text-white mr-2" type="button"
                >Refresh
        </button>
      </b-row>
      <b-row class="ml-2 mt-3 mr-2">
        <b-col class="p-2" style="background: #29292d; border: #fff solid 1px">
          <h2 class="text-right">Manifest - Normal D/O</h2>
          <DonutChart v-bind:values="[20, 30, 500]" v-bind:labels="['Completed', 'Not Packed', 'Urgent']" v-bind:background-color="['#0037fc', '#ff0000', '#f1ff00']"/>
        </b-col>
        <b-col class="p-2" style="background: #29292d; border: #fff solid 1px">
          <h2 class="text-right">Manifest - Urgent D/O</h2>
          <DonutChart v-bind:values="[20, 30]" v-bind:labels="['Completed', 'Not Packed']" v-bind:background-color="['#0037fc', '#ff0000']"/>
        </b-col>
      </b-row>
      <b-row class="ml-2 mr-2">
        <b-col class="p-2" style="background: #29292d; border: #fff solid 1px">
          <h2 class="text-right">Lines - Normal D/O</h2>
          <DonutChart v-bind:values="[20, 30, 500]" v-bind:labels="['Completed', 'Not Packed', 'Urgent']" v-bind:background-color="['#0037fc', '#ff0000', '#f1ff00']"/>
        </b-col>
        <b-col class="p-2" style="background: #29292d; border: #fff solid 1px">
          <h2 class="text-right">Lines - Urgent D/O</h2>
          <DonutChart v-bind:values="[20, 30]" v-bind:labels="['Completed', 'Not Packed']" v-bind:background-color="['#0037fc', '#ff0000']"/>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col id="backlog_col">
          <h2 class="text-center font-weight-bold">BACKLOG = 10,543</h2>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import DonutChart from "@/components/DonutChart";

export default {
  name: "MLPage",
  components: {
    DonutChart,
  },
};
</script>

<style scoped>
#backlog_col h2{
  font-size: 80px !important;
}
</style>
