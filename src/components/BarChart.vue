<template>
  <div class="example">
    <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import http from '../http-common.js';

export default {
  name: 'BarChart',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [{
        data: [400, 430, 448, 470, 590, 580, 320, 440],
      }],
      chartOptions: {
        chart: {
          type: 'bar',
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            /* dataLabels: {
              position: 'bottom',
            }, */
          },
        },
        colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e'],
        dataLabels: {
          offsetY: -6,
          style: {
            fontSize: '20px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: ['#fff'],
          },
          enabled: true,
          textAnchor: 'start',
          /* formatter(val, opt) {
            return `${opt.w.globals.labels[opt.dataPointIndex]}:  ${val}`;
          }, */
        },
        xaxis: {
          categories: ['TV', 'AUDIO', 'MON', 'AC', 'REF', 'WM', 'VC', 'MWO'],
        },
        yaxis: {
          labels: {
            style: {
              colors: '#000000',
              fontSize: '30px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 'bold',
            },
          },
        },
        tooltip: {
          y: {
            title: {
              formatter() {
                return '';
              },
            },
          },
        },
      },
    };
  },
  mounted() {
    this.getDate();
    this.startTimer();
  },
  methods: {
    getDate() {
      http.get('/getStockRefresh')
        .then((res) => {
          const dataArr = res.data;
          this.series = [{
            data: Object.values(dataArr[0]),
          }];
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
      }, 6000);
    },
  },
};
</script>
