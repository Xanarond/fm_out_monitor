<template>
  <div class="pb-2">
    <b-row class="justify-content-center pb-3">
      <div class="d-inline-block  mt-auto mb-auto" style="color: #fff">Period:</div>
      <VueCtkDateTimePicker v-model="period.cur_date" :dark=true :label="'Select Date'" :noButton=true
                            :noHeader=true :noValueToCustomElem=true
                            :onlyDate=true class="justify-content-start d-inline-block mt-auto mb-auto"
                            formatted="L"
                            style="width: 380px;margin:0 5px 5px;"/>
      <button class="d-inline-block ml-1 mt-auto mb-auto btn btn-secondary text-white mr-2" type="button"
              v-on:click="getDate()">Refresh
      </button>
    </b-row>
    <b-table
        :head-variant="col"
        :bordered="true"
        :fields="fields"
        :items="not_picked"
        :table-variant="tableVariant"
        class="out_table mt-1"
    ></b-table>
    <b-row class="justify-content-center">
      <b-col cols="9">
        <b-table v-if="url === '/getPivotPickTask'"
                 :head-variant="dark"
                 :bordered="true"
                 :fields="total_fields"
                 :items="totals"
                 :table-variant="tableVariant"
                 class="out_table"
        >
          <template>
            <b-th></b-th>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>
<script>

import moment from "moment";
import http from "@/http-common";
// import $ from "jquery";

/**
 * @type {string}
 */

export default {
  props: ['url', 'field'],
  name: 'PGITable',
  components: {},
  data() {
    return {
      fields: this.$props.field,
      total_fields: ['Pick task Total', 'Not Picked Total', 'Pick Consolidated Total', 'Progress Total'],
      tableVariant: 'dark',
      not_picked: [],
      totals: [],
      col: 'light',
      total_d: [],
      total: 6000,
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
    getDate() {
      http.get(this.$props.url, {
        params: {
          cur_date: this.$data.period.cur_date.slice(0, 10),
        },
      })
        .then((res) => {
          // массив целевых значений
          console.log(res.data);
          const main_obj = res.data;
          console.log(main_obj);
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
          const num_pick = [];
          const not_pick = [];
          const pick_consol = [];
          main_obj.forEach(
            (el) => {
              num_pick.push(Number(el["Number of Pick Task"]));
              not_pick.push(Number(el["Not Picked"]));
              pick_consol.push(Number(el["Pick Consolidated"]));
            },
          );
          const total_arr = [];
          const num_pick_sum = num_pick.reduce(reducer);
          const not_pick_sum = not_pick.reduce(reducer);
          const pick_consol_sum = pick_consol.reduce(reducer);
          // eslint-disable-next-line no-mixed-operators
          const progress_total = 100 * (not_pick_sum + pick_consol_sum) / num_pick_sum;

          const total_obj = {
            'Pick task Total': num_pick_sum,
            'Not Picked Total': not_pick_sum,
            'Pick Consolidated Total': pick_consol_sum,
            'Progress Total': `${Math.round(progress_total)}%`,
          };
          total_arr.push(total_obj);
          console.log(total_arr);
          this.totals = total_arr;
          this.not_picked = res.data;
        })
        .catch((e) => console.log(e, 'Нет ответа от сервера'));
    },
    stopTimer() {
      if (this.interval) {
        window.clearInterval(this.interval);
      }
    },
    startTimer() {
      this.stopTimer();
      this.interval = window.setInterval(() => {
        this.getDate();
      }, 60000);
    },
  },
  created() {
    this.getDate();
  },
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    this.stopTimer();
  },
};
</script>
<style scoped>
#pivot div {
  text-align: center !important;
  font-size: 32px;
  font-weight: bold;
  font-family: "Expo M", serif;
}

.out_table {
  font-size: 30px;
}

.hidden_header {
  display: none;
}
</style>
