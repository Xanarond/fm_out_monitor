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
import moment from "moment";
import http from "@/http-common";

export default {
  name: "MLPage",
  components: {
    DonutChart,
  },
  data() {
    return {
      period: {
        cur_date: moment()
          .format('YYYY-MM-DD'),
        past_date: moment(this.cur_date)
          .subtract(1, 'day')
          .format('YYYY-MM-DD'),
      },
    };
  },
  methods: {
    getCountData() {
      http.get('/getMLNormal', {
        /* params: {
          cur_date: this.$data.period.cur_date.slice(0, 10),
          past_date: moment(this.$data.period.cur_date.slice(0, 10))
            .subtract(1, 'day')
            .format('YYYY-MM-DD'),
        }, */
      })
        .then((res) => {
          // результирующий массив из БД
          // const counts = [];

          console.log(res.data);

          /* res.data.shift_stat.forEach(((item) => {
            shifts.push(item.result);
          }));

          this.series = [{
            data: shifts.slice(8, 20),
          }];

          // суммы для результатов
          const com = shifts.slice(8, 20)
            .reduce((sum, cur) => sum + cur, 0);
          this.complete = new Intl.NumberFormat('en-US').format(com);
          this.progress = `${Math.floor((com / this.total) * 100)}%`; */
        })
        .catch((e) => e === 'Нет ответа от сервера');
    },
    stopTimer() {
      if (this.interval) {
        window.clearInterval(this.interval);
      }
    },
    startTimer() {
      this.stopTimer();
      this.interval = window.setInterval(() => {
        this.getCountData();
      }, 600000);
    },
  },
  mounted() {
    this.getCountData();
  },
};
</script>

<style scoped>
#backlog_col h2{
  font-size: 80px !important;
}
</style>
