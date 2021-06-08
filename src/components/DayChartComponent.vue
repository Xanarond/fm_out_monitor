<template>
  <div class="chart">
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
import VueApexCharts from 'vue-apexcharts';
import moment from 'moment';
import http from '../http-common';

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
      period: {
        cur_date: moment()
          .format('YYYY-MM-DD'),
        past_date: moment(this.cur_date)
          .subtract(1, 'day')
          .format('YYYY-MM-DD'),
      },
      chartOptions: {
        chart: {
          id: 'bar',
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
        },
        fill: {
          // eslint-disable-next-line no-nested-ternary
          colors: [({ value }) => (this.max_target < value ? '#3fe656' : value >= this.min_target ? '#0071C0' : '#f4cb50')],
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
                  fontSize: '24 px',
                },
                text: 'Target Point',
              },
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
                  fontSize: '24 px',
                },
                text: 'Target Point',
              },
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
                  fontSize: '40px',
                },
                text: 'Target Point',
              },
            },
          ],
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: -60,
          style: {
            fontSize: '45px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: '#fff',
              fontSize: '20px',
            },
          },
        },
        xaxis: {
          categories: this.getFormatData(),
          labels: {
            style: {
              colors: '#fff',
              fontSize: '30px',
            },
          },
        },
      },
      series: [{
        name: 'series-1',
        data: [230, 350, 45],
      }],
    };
  },
  mounted() {
    // this.getCounters();
    this.getDate();
    this.startTimer();
  },
  beforeDestroy() {
    this.stopTimer();
  },
  methods: {
    getFormatData() {
      const time_zone = [];

      for (let i = 0; i <= 23; i++) {
        time_zone[i] = i <= 9 ? `0${i}:00` : `${i}:00`;
      }
      return time_zone.slice(8, 20);
    },
    getCounters() {
      http.get('/refreshDB')
        .then((res) => {
          // результирующий массив из БД
          const shifts = [];

          res.data.shift_stat.forEach(((item) => {
            shifts.push(item.result);
          }));

          this.series = [{
            data: shifts.slice(8, 20),
          }];

          // суммы для результатов
          const com = shifts.slice(8, 20)
            .reduce((sum, cur) => sum + cur, 0);
          this.complete = new Intl.NumberFormat('en-US').format(com);
          this.progress = `${Math.floor((com / this.total) * 100)}%`;
        })
        .catch((e) => e === 'Нет ответа от сервера');
    },
    getDate() {
      http.get('/getPackingShifts', {
        params: {
          cur_date: this.$data.period.cur_date.slice(0, 10),
          past_date: moment(this.$data.period.cur_date.slice(0, 10))
            .subtract(1, 'day')
            .format('YYYY-MM-DD'),
        },
      })
        .then((res) => {
          // the resulting array from the database
          const shifts = [];
          for (let i = 0; i < 24; i++) {
            const obj = {
              time: i <= 9 ? `0${i}:00:00` : `${i}:00:00`,
              result: 0,
            };
            shifts.push(obj);
          }

          const day_s = [];
          // processing the resulting array and creating object based on  - time, value
          res.data.cur_date.forEach((item) => {
            item.forEach(({
              pack_time,
              result,
            }) => {
              const obj = {
                time: pack_time,
                result: parseInt(result, 10),
              };
              day_s.push(obj);
            });
          });

          const par_s = [];
          res.data.past_date.forEach((item) => {
            item.forEach(({
              pack_time,
              result,
            }) => {
              const obj = {
                time: pack_time,
                result: parseInt(result, 10),
              };
              par_s.push(obj);
            });
          });
          // add union array for comparing times & result
          const compare = [...shifts, ...day_s, ...par_s];

          const key = 'time';
          // sorting array by unique time
          const arrayUniqueByKey = [...new Map(compare.map(item => [item[key], item])).values()];

          console.log(arrayUniqueByKey);

          // obj sort by timestamp
          const sorted_shift = arrayUniqueByKey.sort(((a, b) => a.time > b.time));
          console.log(sorted_shift);
          const res_shift = []; // sorted time
          sorted_shift.slice(8, 20)
            .forEach((i) => res_shift.push(i.result));
          console.log(res_shift);

          this.series = [{
            data: res_shift,
          }];

          // amounts for results
          this.max_target = this.total / 12;
          this.min_target = this.max_target - 50;
          const com = res_shift.reduce((sum, cur) => sum + cur, 0);
          this.complete = new Intl.NumberFormat('en-US').format(com);
          this.progress = `${Math.floor((com / this.total) * 100)}%`;
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
