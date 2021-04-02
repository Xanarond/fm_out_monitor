<template>
  <div class="chart">
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
        legend: {
          // show: true,
          position: 'top',
          horizontalAlign: 'right',
        },
        fill: {
          //type: 'gradient',
          colors: [function ({value}) {
            if (333 < value) {
              return '#3fe656';
            } else if (value >= 300) {
              return '#0071C0';
            } else {
              return '#f4cb50';
            }
          }],
        },
        annotations: {
          yaxis: [
            {
              y: 333,
              borderColor: '#00E396',
              width: '100%',
              label: {
                borderColor: '#00E396',
                borderRadius: 20,
                style: {
                  color: '#fff',
                  borderWidght: 20,
                  background: '#00E396',
                  fontSize: '24 px'
                },
                text: 'Target Point'
              }
            },
            {
              y: 334,
              borderColor: '#00E396',
              width: '100%',
              height: '30px',
              label: {
                borderColor: '#00E396',
                borderRadius: 20,
                style: {
                  color: '#fff',
                  borderWidght: 20,
                  background: '#00E396',
                  fontSize: '24 px'
                },
                text: 'Target Point'
              }
            },
            {
              y: 335,
              borderColor: '#00E396',
              width: '100%',
              height: '30px',
              label: {
                borderColor: '#00E396',
                borderRadius: 20,
                style: {
                  color: '#fff',
                  borderWidght: 20,
                  background: '#00E396',
                  fontSize: '40px'
                },
                text: 'Target Point'
              }
            }
          ],
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          offsetY: -60,
          style: {
            fontSize: "45px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold"
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#fff',
              fontSize: '20px'
            }
          },
        },
        xaxis: {
          categories: this.getFormatData(),
          labels: {
            style: {
              colors: '#fff',
              fontSize: '30px'
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
    getFormatData() {
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

