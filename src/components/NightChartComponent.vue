<template>
  <div class="chart" style="background: #605f5f">
    <b-row>
      <b-col class="border-right h-75 mt-5">
        <b-row class="pt-5">
          <b-col class="m-auto"><h2>Shift Target</h2></b-col>
          <b-col>
            <div>
              <hr/>
            </div>
          </b-col>
          <b-col cols="12">
            <h1 style="font-size: 90px;">{{ total }}</h1>
          </b-col>
        </b-row>
        <b-row class="pt-5">
          <b-col class="m-auto"><h2>Complete</h2></b-col>
          <b-col>
            <div>
              <hr/>
            </div>
          </b-col>
          <b-col cols="12">
            <h1 style="font-size: 90px;">{{ complete }}</h1>
          </b-col>
        </b-row>
        <b-row class="pt-5">
          <b-col class="m-auto"><h2>Progress Rate</h2></b-col>
          <b-col>
            <div>
              <hr/>
            </div>
          </b-col>
          <b-col cols="12">
            <h1 style="font-size: 90px;">{{ progress }}</h1>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="9">
        <apexcharts height="700" type="bar" :options="chartOptions" :series="series"></apexcharts>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import http from "@/http-common";

export default {
  name: 'NightChartComponent',
  components: {
    apexcharts: VueApexCharts,
  },
  data() {
    return {
      complete: '',
      total: '',
      progress: '',
      chartOptions: {
        chart: {
          id: 'bar',
        },
        legend:{
          position: 'top',
          horizontalAlign: 'right',
        },
        fill: {
          colors: [({value}) => {
            return 333 < value ? '#3fe656' : value >= 300 ? '#0071C0' : '#f4cb50';
          }],
        },
        annotations: {
          yaxis: [
            {
              y: 333,
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
                  fontSize: '22 px'
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
                  fontSize: '22 px'
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
    getFormatData(){
      let time_zone = []

      for (let i = 0; i <= 23; i++) {
        time_zone[i] = i <= 9 ? `0${i}:00` : `${i}:00`;
      }
      return time_zone.slice(20, 24).concat(time_zone.slice(0, 8))
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
              data: shifts.slice(20, 24).concat(shifts.slice(0, 8))
            }]

            // суммы для результатов
            let night_s = shifts.slice(20, 24).concat(shifts.slice(0, 8))
            let com = night_s.reduce((sum, cur) => {
              return sum + cur
            }, 0)

            this.total = new Intl.NumberFormat('en-US').format(4000)
            this.complete = new Intl.NumberFormat('en-US').format(com)
            this.progress = Math.floor((com / 4000) * 100) + '%'

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

