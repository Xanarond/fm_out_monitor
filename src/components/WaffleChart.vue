<template>
  <div id="chart">
    <table>
      <tr>
        <th><div style="font-size:25px;">Total</div></th>
        <th><div style="font-size:25px;">A</div></th>
      </tr>
      <tr>
        <th><div class="chart" :key="componentKey" :data-waffly-value="`${total}%`"></div></th>
        <th><div class="chart" :key="componentKey" :data-waffly-value="`${a_zone}%`"></div></th>
      </tr>
      <tr>
        <th><div style="font-size:25px;">B</div></th>
        <th><div style="font-size:25px;">C</div></th>
      </tr>
      <tr>
        <th><div class="chart" :key="componentKey" :data-waffly-value="`${b_zone}%`"></div></th>
        <th><div class="chart" :key="componentKey"  :data-waffly-value="`${c_zone}%`"></div></th>
      </tr>
    </table>
  </div>
</template>

<script>

import http from "../http-common";
// eslint-disable-next-line no-multi-assign
window.$ = window.jQuery = require('jquery');
window.waffly = require("../../js/jquery.waffly");

export default {
  name: "WaffleChart",
  components: {
  },
  data() {
    return {
      total: 0,
      a_zone: 0,
      b_zone: 0,
      c_zone: 0,
      componentKey: 0,
    };
  },
  created() {
    this.makeChart();
    this.getDate();
  },
  beforeUpdate() {
    this.makeChart();
    this.startTimer();
    this.componentKey += 1;
  },
  methods: {
    makeChart() {
      // eslint-disable-next-line no-undef
      $(document).ready(() => {
        // eslint-disable-next-line no-undef
        $('.chart').waffly({
          graph_width: 450,
          dot_gap: 3,
          dot_radius: '2px',
          graph_color: '#333',
          graph_title_color: '#555',
          graph_value_color: '#C00',
          dot_opacity: 0.2,
          graph_reverse: true,
          graph_animate: false,
        });
      });
    },
    getDate() {
      http.get('/getStockPercent')
        .then((res) => {
          const dataArr = res.data;
          this.total = `${dataArr[0].total}`;
          this.a_zone = `${dataArr[0].A}`;
          this.b_zone = `${dataArr[0].B}`;
          this.c_zone = `${dataArr[0].C}`;
          // console.log(this.total, this.a_zone, this.b_zone, this.c_zone);
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
      }, 600000);
    },
  },
};
</script>

<style>
html body {
  background: #fff !important;
}
tr th{
  border: 1px #000000 solid;
}
.chart {
  width: auto !important;
}
</style>
