<template>
  <div>
    <b-container fluid="">
      <b-row>
        <b-col>
          <h2 class="text-left title">Дневная смена</h2>
          <b-table
              class="out_table mt-1"
              :items="day_shift"
              :fields="fields"
              :table-variant="tableVariant"
              :bordered="true"
              :head-variant="col"
          ></b-table>
        </b-col>
        <b-col>
          <h2 class="text-left title">Ночная смена</h2>
          <b-table
              class="out_table mt-1"
              :items="night_shift"
              :fields="fields"
              :table-variant="tableVariant"
              :bordered="true"
              :head-variant="col"
          ></b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table
              class="out_table"
              :items="total_d"
              :fields="total_fields"
              :table-variant="tableVariant"
              :bordered="true"
              :head-variant="col"
          ></b-table>
        </b-col>
        <b-col>
          <b-table
              class="out_table"
              :items="total_n"
              :fields="total_fields"
              :table-variant="tableVariant"
              :bordered="true"
              :head-variant="col"
          ></b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import $ from 'jquery'
import http from '../http-common'

export default {

  name: "TableComponent",
  created() {
    // массив целевых значений
    let target = Array(12).fill(250)

    // задаем массивы для временных промежутков
    let time_zone = []

    for (let i = 0; i <= 23; i++) {
      time_zone[i] = i <= 9 ? `0${i}:00` : `${i}:00`;
    }

    let day_shift = time_zone.slice(8, 20)
    let night_shift = time_zone.slice(20, 24).concat(time_zone.slice(0, 8))

    let rand_int = []

    for (let i = 0; i <= 11; i++) {
      rand_int[i] = Math.floor(Math.random() * 1000)
    }

    let rand_int2 = []

    for (let i = 0; i <= 11; i++) {
      rand_int2[i] = Math.floor(Math.random() * 1000)
    }

    // суммы для результатов
    let total_day = rand_int.reduce((sum, cur) => {
      return sum + cur
    }, 0);

    let total_night = rand_int2.reduce((sum, cur) => {
      return sum + cur
    }, 0);

    let target_sum = target.reduce((sum, cur) => {
      return sum + cur
    }, 0);

    let sum_day = []
    let sum_night = []

    let day_t = {
      target: target_sum,
      total: total_day,
    }
    sum_day.push(day_t)

    let night_t = {
      target: target_sum,
      total: total_night
    }
    sum_night.push(night_t)

    //рассчет статусов
    let status1 = []

    for (let i = 0; i <= 11; i++) {
      if (target[i] < rand_int[i]) {
        status1[i] = 'Отлично';
      } else if (rand_int[i] > 200) {
        status1[i] = 'Норма';
      } else {
        status1[i] = 'Плохо';
      }
    }

    let status2 = []
    for (let i = 0; i <= 11; i++) {
      if (target[i] < rand_int2[i]) {
        status2[i] = 'Отлично';
      } else if (rand_int2[i] > 200) {
        status2[i] = 'Норма';
      } else {
        status2[i] = 'Плохо';
      }
    }

    // упаковка обьектов статусов в массив
    let day_arr = []

    for (let i = 0; i <= 11; i++) {
      let obj = {
        time: day_shift[i],
        result: rand_int[i],
        target: target[i],
        status: status1[i]
      }
      day_arr.push(obj);
    }

    let night_arr = []

    for (let i = 0; i <= 11; i++) {
      let obj = {
        time: night_shift[i],
        result: rand_int2[i],
        target: target[i],
        status: status2[i]
      }
      night_arr.push(obj);
    }

    $(function () {
      $('td:contains("Плохо")').parent().css('background', '#ff0000')
      $('td:contains("Отлично")').parent().css('background', '#00AF50')
      $('td:contains("Норма")').parent().css('background', '#0071C0')
    });

    this.day_shift = day_arr
    this.night_shift = night_arr
    this.total_d = sum_day
    this.total_n = sum_night

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
      total_n: []
    }
  },
  mounted() {
    http.get("/refreshDB", {})
        .then(res => {
          console.log(res.data);
        })
  },
}

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