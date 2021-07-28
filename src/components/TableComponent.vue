<template>
  <div>
    <b-container fluid="">
      <b-row>
        <b-col>
          <h2 class="text-left title">Дневная смена</h2>
          <b-table
              :bordered="true"
              :fields="fields"
              :head-variant="col"
              :items="day_shift"
              :table-variant="tableVariant"
              class="out_table mt-1"
          ></b-table>
        </b-col>
        <b-col>
          <h2 class="text-left title">Ночная смена</h2>
          <b-table
              :bordered="true"
              :fields="fields"
              :head-variant="col"
              :items="night_shift"
              :table-variant="tableVariant"
              class="out_table mt-1"
          ></b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table
              :bordered="true"
              :fields="total_fields"
              :head-variant="col"
              :items="total_d"
              :table-variant="tableVariant"
              class="out_table"
          ></b-table>
        </b-col>
        <b-col>
          <b-table
              :bordered="true"
              :fields="total_fields"
              :head-variant="col"
              :items="total_n"
              :table-variant="tableVariant"
              class="out_table"
          ></b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import $ from 'jquery';
import moment from "moment";
import http from '../http-common';

export default {

  name: 'TableComponent',
  created() {
    // массив целевых значений
    const target = Array(12)
      .fill(this.total / 12);

    // задаем массивы для временных промежутков
    const time_zone = [];

    for (let i = 0; i <= 23; i++) {
      time_zone[i] = i <= 9 ? `0${i}:00` : `${i}:00`;
    }

    const day_shift = time_zone.slice(8, 20);
    const night_shift = time_zone.slice(20, 24)
      .concat(time_zone.slice(0, 8));

    const rand_int = [];

    for (let i = 0; i <= 11; i++) {
      rand_int[i] = Math.floor(Math.random() * 1000);
    }

    const rand_int2 = [];

    for (let i = 0; i <= 11; i++) {
      rand_int2[i] = Math.floor(Math.random() * 1000);
    }

    // суммы для результатов
    const total_day = rand_int.reduce((sum, cur) => sum + cur, 0);

    const total_night = rand_int2.reduce((sum, cur) => sum + cur, 0);

    const target_sum = target.reduce((sum, cur) => sum + cur, 0);

    const sum_day = [];
    const sum_night = [];

    const day_t = {
      target: target_sum,
      total: total_day,
    };
    sum_day.push(day_t);

    const night_t = {
      target: target_sum,
      total: total_night,
    };
    sum_night.push(night_t);

    // рассчет статусов
    const status1 = [];

    for (let i = 0; i <= 11; i++) {
      if (target[i] < rand_int[i]) {
        status1[i] = 'Отлично';
      } else if (rand_int[i] > 300) {
        status1[i] = 'Норма';
      } else {
        status1[i] = 'Плохо';
      }
    }

    const status2 = [];
    for (let i = 0; i <= 11; i++) {
      if (target[i] < rand_int2[i]) {
        status2[i] = 'Отлично';
      } else if (rand_int2[i] > 300) {
        status2[i] = 'Норма';
      } else {
        status2[i] = 'Плохо';
      }
    }

    // упаковка обьектов статусов в массив
    const day_arr = [];

    for (let i = 0; i <= 11; i++) {
      const obj = {
        time: day_shift[i],
        result: rand_int[i],
        target: target[i],
        status: status1[i],
      };
      day_arr.push(obj);
    }

    const night_arr = [];

    for (let i = 0; i <= 11; i++) {
      const obj = {
        time: night_shift[i],
        result: rand_int2[i],
        target: target[i],
        status: status2[i],
      };
      night_arr.push(obj);
    }

    $(() => {
      $('td:contains("Плохо")')
        .parent()
        .css('background', '#ff0000');
      $('td:contains("Отлично")')
        .parent()
        .css('background', '#00AF50');
      $('td:contains("Норма")')
        .parent()
        .css('background', '#0071C0');
    });

    this.day_shift = day_arr;
    this.night_shift = night_arr;
    this.total_d = sum_day;
    this.total_n = sum_night;
  },
  data() {
    return {
      fields: ['time', 'target', 'result', 'status'],
      total_fields: ['target', 'total'],
      tableVariant: 'dark',
      day_shift: [],
      night_shift: [],
      col: 'dark',
      total_d: [],
      total_n: [],
      total: 6000,
    };
  },
  methods: {
    getCounters() {
      http.get('/refreshDB', {})
        .then((res) => {
          // массив целевых значений
          const target = Array(12)
            .fill(this.total / 12);

          // результирующий массив из БД
          const shifts = [];

          // задаем массивы для временных промежутков
          const time_zone = [];

          res.data.shift_stat.forEach((item) => {
            shifts.push(item.result);
            time_zone.push(item.time);
          });

          const day_shift = time_zone.slice(8, 20);
          const night_shift = time_zone.slice(20, 24)
            .concat(time_zone.slice(0, 8));
            // console.log(day_shift, night_shift)

          const day_res = shifts.slice(8, 20);
          const night_res = shifts.slice(20, 24)
            .concat(shifts.slice(0, 8));
            // console.log(day_res, night_res)

          // суммы для результатов
          const total_day = day_res.reduce((sum, cur) => sum + cur, 0);

          const total_night = night_res.reduce((sum, cur) => sum + cur, 0);

          // let target_sum = target.reduce((sum, cur) => {
          // return sum + cur
          // }, 0);

          const sum_day = [];
          const sum_night = [];

          const day_t = {
            target: this.total,
            total: total_day,
          };
          sum_day.push(day_t);

          const night_t = {
            target: this.total,
            total: total_night,
          };
          sum_night.push(night_t);

          // рассчет статусов
          const status1 = [];

          for (let i = 0; i <= 11; i++) {
            status1[i] = target[i] < day_res[i]
              ? 'Отлично' : status1[i] = day_res[i] >= 300
                ? 'Норма' : status1[i] = day_res[i] === 0 || day_res[i] === ''
                  ? '-' : 'Плохо';
          }

          const status2 = [];
          for (let i = 0; i <= 11; i++) {
            status2[i] = target[i] < night_res[i]
              ? 'Отлично' : status2[i] = night_res[i] >= 300
                ? 'Норма' : status2[i] = night_res[i] === 0 || night_res[i] === ''
                  ? '-' : 'Плохо';
          }

          // упаковка обьектов статусов в массив
          const day_arr = [];

          for (let i = 0; i <= 11; i++) {
            const obj = {
              time: day_shift[i],
              result: day_res[i],
              target: target[i],
              status: status1[i],
            };
            day_arr.push(obj);
          }

          const night_arr = [];

          for (let i = 0; i <= 11; i++) {
            const obj = {
              time: night_shift[i],
              result: night_res[i],
              target: target[i],
              status: status2[i],
            };
            night_arr.push(obj);
          }

          $(() => {
            $('td:contains("Плохо")')
              .parent()
              .css('background', '#ff0000');
            $('td:contains("Отлично")')
              .parent()
              .css('background', '#00AF50');
            $('td:contains("Норма")')
              .parent()
              .css('background', '#0071C0');
            $('td:contains("-")')
              .parent()
              .css('background', '#343a40');
          });

          this.day_shift = day_arr;
          this.night_shift = night_arr;
          this.total_d = sum_day;
          this.total_n = sum_night;
        })
        .catch((e) => e === 'Нет ответа от сервера');
    },
    getDate() {
      http.get('/getPackingShifts', {
        params: {
          cur_date: moment().subtract(20, 'day').format('YYYY-MM-DD').slice(0, 10),
          past_date: moment()
            .subtract(21, 'day')
            .format('YYYY-MM-DD').slice(0, 10),
        },
      })
        .then((res) => {
          console.log(res.data);
          // массив целевых значений

          // результирующий массив из БД
          const shifts = [];
          for (let i = 0; i < 24; i++) {
            const obj = {
              time: i <= 9 ? `0${i}:00:00` : `${i}:00:00`,
              result: 0,
              target: this.total / 12,
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
                target: this.total / 12,
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
                target: this.total / 12,
              };
              par_s.push(obj);
            });
          });

          const compare = [...shifts, ...day_s, ...par_s];

          const key = 'time';
          // sorting array by unique time
          const arrayUniqueByKey = [...new Map(compare.map(item => [item[key], item])).values()];

          console.log(arrayUniqueByKey);

          // задаем массивы для временных промежутков
          // const time_zone = [];

          /* res.data.past_date.forEach((item) => {
            shifts.push(item.result);
            time_zone.push(item.pack_time);
          }); */
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
        this.getDate();
        // this.getCounters();
      }, 5000);
    },
  },
  mounted() {
    // this.getCounters();
    this.getDate();
    this.startTimer();
  },
  destroyed() {
    this.stopTimer();
  },
};

</script>
<style scoped>

@media screen and (min-width: 2160px) {
  .out_table {
    font-size: 70px;
  }

  .title {
    font-size: 80px;
    color: #fff !important;
  }
}

@media screen and (max-width: 1920px) {
  .out_table {
    font-size: 18px;
  }

  .title {
    font-size: 30px;
    color: #fff !important;
  }
}

.exelent_st tr {
  background: #00AF50;
}

.bad_st tr {
  background: #ff0000;
}

.nb_stat tr {
  background: #0071C0;
}
</style>
