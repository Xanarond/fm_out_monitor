<template>
  <div>
    <b-container fluid="">
      <b-row>
        <b-col>
          <h2 class="text-left title" style="color: #fff">Day shift</h2>
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
          <h2 class="text-left title" style="color: #fff">Night shift</h2>
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
    </b-container>
  </div>
</template>

<script>

import $ from 'jquery'

export default {

  name: "TableComponent",
  created() {
    let target = Array(12).fill(250)

    let time_zone = []

    for (let i = 0; i <= 23; i++) {
      time_zone[i] = i <= 9 ? `0${i}:00` : `${i}:00`;
    }
    let day_shift = time_zone.slice(8, 20)
    let night_shift = time_zone.slice(20, 24).concat(time_zone.slice(0, 8))

    let rand_int = []

    for (let i = 0; i <= 11; i++) {
      let el = Math.floor(Math.random() * 1000)
      rand_int[i] = el
    }

    let rand_int2 = []

    for (let i = 0; i <= 11; i++) {
      let el2 = Math.floor(Math.random() * 1000)
      rand_int2[i] = el2
    }


    let status1 = []
    for (let i = 0; i <= 12; i++) {
      if (target[i] < rand_int[i]) {
        status1[i] = 'Отлично';
      } else if (rand_int[i] > 200) {
        status1[i] = 'Норма';
      } else {
        status1[i] = 'Плохо';
      }
    }

    let status2 = []
    for (let i = 0; i <= 12; i++) {
      if (target[i] < rand_int2[i]) {
        status2[i] = 'Отлично';
      } else if (rand_int2[i] > 200) {
        status2[i] = 'Норма';
      } else {
        status2[i] = 'Плохо';
      }
    }

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

    this.$data.day_shift = day_arr
    this.$data.night_shift = night_arr

    $(function () {
      $('td:contains("Плохо")').parent().css('background', '#ff0000')
      $('td:contains("Отлично")').parent().css('background', '#00AF50')
      $('td:contains("Норма")').parent().css('background', '#0071C0')
    });

  },
  data() {
    return {
      fields: ['time', 'target', 'result', 'status'],
      tableVariant: 'dark',
      day_shift: [],
      night_shift: [],
      col: 'dark',
      x: 2,
      y: 3
    }
  },
  mounted() {

  },
}

</script>
<style scoped>

@media screen and (min-width: 2280px) {
  .out_table {
    font-size: 80px;
  }

  .title {
    font-size: 80px;
  }
}

@media screen and (min-width: 1280px) {
  .out_table {
    font-size: 30px;
  }

  .title {
    font-size: 30px;
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