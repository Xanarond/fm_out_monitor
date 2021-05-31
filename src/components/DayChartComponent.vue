<template>
  <div class="chart">
    <b-row class="justify-content-center pb-3">
      <div class="d-inline-block  mt-auto mb-auto" style="color: #fff">Period:</div>
      <VueCtkDateTimePicker :dark=true :label="'Select Date'" :noButton=true :noHeader=true
                            v-model="period" formatted="L"
                            :noValueToCustomElem=true :onlyDate=true
                            class="justify-content-start d-inline-block mt-auto mb-auto"
                            style="width: 380px;margin:0 5px 5px;"/>
      <button class="d-inline-block ml-1 mt-auto mb-auto btn btn-secondary text-white mr-2" type="button"
              v-on:click="getDate()">Refresh
      </button>
    </b-row>
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
        <apexcharts :options="chartOptions" :series="series" height="700" type="bar"></apexcharts>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import http from "@/http-common";
import moment from "moment";

export default {
  name: 'DayChartComponent',
  components: {
    apexcharts: VueApexCharts,
  },
  data() {
    return {
      complete: '',
      total: 6000,
      progress: '',
      max_target: '',
      min_target: '',
      period: moment().format('YYYY-MM-DD'),
      chartOptions: {
        chart: {
          id: 'bar',
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
        },
        fill: {
          colors: [({value}) => {
            return this.max_target < value ? '#3fe656' : value >= this.min_target ? '#0071C0' : '#f4cb50';
          }],
        },
        annotations: {
          yaxis: [
            {
              y: 500,
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
              y: 500 + 1,
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
              y: 500 + 2,
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
    // this.getCounters();
    this.getDate()
    this.startTimer()
    this.max_target = this.total / 12
    this.min_target = this.max_target - 50
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
      http.get("/refreshDB")
          .then(res => {

            //результирующий массив из БД
            let shifts = []

            res.data.shift_stat.forEach((item => {
              shifts.push(item.result)
            }))

            this.series = [{
              data: shifts.slice(8, 20)
            }]

            // суммы для результатов
            let com = shifts.slice(8, 20).reduce((sum, cur) => sum + cur, 0)
            this.complete = new Intl.NumberFormat('en-US').format(com)
            this.progress = Math.floor((com / this.total) * 100) + '%'

          }).catch((e) => {
        return e === 'Нет ответа от сервера'
      })
    },
    getDate() {
      http.get("/getPackingShifts", {
        params: {
          period: this.$data.period.slice(0, 10),
        }
      }).then(res => {

        //результирующий массив из БД
        let shifts = []

        //обработка результирующего массива и создание на его основе обьектов - время, значение
        res.data.forEach((item => {
          item.forEach(i => {
            if (i.pack_time <= '19:00:00' && i.pack_time >= '08:00:00') {
              let obj = {
                time: i.pack_time,
                result: parseInt(i.result)
              }
              shifts.push(obj)
            }
          })
        }))

        //сортировка обьектов по времени / obj sort by timestamp
        let sorted_shift = shifts.sort(((a, b) => a.time > b.time))
        let res_shift = [] // отсортированое время
        sorted_shift.forEach(i => res_shift.push(i.result))

        let null_arr = Array(12).fill(0)
        null_arr.forEach((value, index) => null_arr[index] = res_shift[index] || 0)

        //заполнение значениями
        this.series = [{
          data: null_arr
        }]

        // суммы для результатов
        let com = res_shift.reduce((sum, cur) => sum + cur, 0)
        this.complete = new Intl.NumberFormat('en-US').format(com)
        this.progress = Math.floor((com / this.total) * 100) + '%'

      }).catch((e) => {
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
        this.getDate()
      }, 5000)
    },
  }
}
</script>

