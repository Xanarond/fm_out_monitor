<template>
  <div class="chart" style="background: #605f5f">
    <apexcharts height="700" type="bar" :options="chartOptions" :series="series"></apexcharts>
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import http from "@/http-common";

export default {
  name: 'DayChartComponent',
  components: {
    apexcharts: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'bar',
        },
        legend:{
          // show: true,
          position: 'top',
          horizontalAlign: 'right',
        },
        fill: {
          type: 'gradient',
          colors: [function ({value}) {
            if (250 < value) {
              return '#00AF50';
            } else if (value >= 200) {
              return '#0071C0';
            } else {
              return '#ff0000';
            }
          }],
        },
        annotations: {
          yaxis: [
            {
              y: 250,
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                style: {
                  color: '#fff',
                  background: '#00E396'
                },
                text: 'Target Point'
              }
            }
          ],
        },
        yaxis: {
          labels: {
            style: {
              colors: '#fff',
              fontSize: '12px'
            }
          },
        },
        xaxis: {
          categories: this.getFormatData(),
          labels: {
            style: {
              colors: '#fff',
              fontSize: '12px'
            }
          },
        }
      },
      series: [{
        name: 'series-1',
        data: [230, 350, 45],
      }],
    }
  },
  mounted() {
    this.getCounters();
    this.startTimer()
  },
  beforeDestroy() {
    this.stopTimer()
  },
  methods: {
    getFormatData(){
      let time_zone = []

      for (let i = 0; i <= 23; i++) {
        time_zone[i] = i <= 9 ? `0${i}:00` : `${i}:00`;
      }
      return time_zone.slice(8, 20)
    },
    getCounters() {
      http.get("/refreshDB", {})
          .then(res => {
            //результирующий массив из БД
            let shifts = []
            res.data.shift_stat.forEach((item => {
              shifts.push(item.result)
            }))
            this.series = [{
              data: shifts.slice(8, 20)
            }]
          })
          .catch((e) => {
            return e === 'Нет ответа от сервера'
          })
    },
    stopTimer() {
      if (this.interval) {
        window.clearInterval(this.interval)
      }
    },
    startTimer() {
      this.stopTimer()
      this.interval = window.setInterval(() => {
        this.getCounters()
      }, 5000)
    },
  }
}
</script>

