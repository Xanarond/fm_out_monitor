<template>
  <div id="chart">
    <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "DonutApex",
  props: ['values', 'labels'],
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: this.$props.values,
      chartOptions: {
        chart: {
          type: 'donut',
          width: 380,
          height: 380,
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 1000,
            animateGradually: {
              enabled: true,
              delay: 150,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          },
        },
        legend: {
          position: 'right',
          floating: false,
          fontSize: '28px',
          fontFamily: 'Helvetica, Arial',
          fontWeight: 400,
          horizontalAlign: 'center',
          labels: {
            colors: '#fff',
            useSeriesColors: false,
          },
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: ['#0037fc', '#ff0000', '#f1ff00'],
            radius: 12,
            offsetX: 0,
            offsetY: 0,
          },
        },
        fill: {
          colors: ['#0037fc', '#ff0000', '#f1ff00'],
        },
        labels: this.$props.labels,
        dataLabels: {
          position: 'top',
          style: {
            fontSize: '22px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: ['#fff'],
          },
        },
        stroke: {
          width: 0,
        },
        tooltip: {
          enabled: false,
        },
        theme: {
          monochrome: {
            enabled: true,
            color: '#ffffff',
          },
        },
        noData: {
          text: "Нет данных",
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: '#fff',
            fontSize: '23px',
          },
        },
        plotOptions: {
          pie: {
            donut: {
              size: '45%',
              labels: {
                show: true,
                value: {
                  show: true,
                  fontSize: '32px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 300,
                  color: '#fff',
                  offsetY: 16,
                  glob(w) {
                    return w.globals.seriesTotals;
                  },
                },
                total: {
                  showAlways: true,
                  show: true,
                  label: 'Total',
                  fontSize: '32px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 600,
                  color: '#ffffff',
                },
              },
            },
          },
        },
      },
    };
  },
};
</script>

<style scoped>

</style>
