<template>
  <div>
    <b-container fluid="">
      <b-row>
        <b-col>
          <h2 class="text-left title" style="color: #fff">Дневная смена</h2>
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
          <h2 class="text-left title" style="color: #fff">Ночная смена</h2>
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
    let target = Array(12).fill(292)
    target[12] = 3575

    let time_zone = []

    for (let i = 0; i <= 23; i++) {
      time_zone[i] = i <= 9 ? `0${i}:00` : `${i}:00`;
    }

    let day_shift = time_zone.slice(8, 20)
    let night_shift = time_zone.slice(20, 24).concat(time_zone.slice(0, 8))
    day_shift[12] = 'Total'
    night_shift[12] = 'Total'
    let rand_int = []

    //for (let i = 0; i <= 11; i++) {
    //let el = Math.floor(Math.random() * 1000)
    rand_int[0] = 122
    rand_int[1] = 0
    rand_int[2] = 0
    rand_int[3] = 0
    rand_int[4] = 0
    rand_int[5] = 0
    rand_int[6] = 0
    rand_int[7] = 0
    rand_int[8] = 0
    rand_int[9] = 0
    rand_int[10] = 0
    rand_int[11] = 0
    //rand_int[12] = rand_int[0] + rand_int[1] + rand_int[2] + rand_int[3] + rand_int[4] + rand_int[5] + rand_int[6] + rand_int[7] + rand_int[8] + rand_int[9] + rand_int[10] + rand_int[11]
    var sum=0;
    for(var i=0;i<=11;i++){
      sum = sum + parseInt(rand_int[i]);
      rand_int[12] = sum
    }
    //}

    let rand_int2 = []

    //for (let i = 0; i <= 11; i++) {
    //let el2 = Math.floor(Math.random() * 1000)
    rand_int2[0] = 50
    rand_int2[1] = 70
    rand_int2[2] = 239
    rand_int2[3] = 288
    rand_int2[4] = 57
    rand_int2[5] = 2
    rand_int2[6] = 106
    rand_int2[7] = 18
    rand_int2[8] = 373
    rand_int2[9] = 137
    rand_int2[10] = 86
    rand_int2[11] = 208
    //rand_int2[12] = rand_int2[0] + rand_int2[1] + rand_int2[2] + rand_int2[3] + rand_int2[4] + rand_int2[5] + rand_int2[6] + rand_int2[7] + rand_int2[8] + rand_int2[9] + rand_int2[10] + rand_int2[11]
    //}
    var sum2=0;
    for(i=0;i<=11;i++){
      sum2 = sum2 + parseInt(rand_int2[i]);
      rand_int2[12] = sum2
    }

    let status1 = []
    //let percent = 0.85
    for (let i = 0; i <= 11; i++) {
      if (target[i] < rand_int[i]) {
        status1[i] = 'Отлично';
      } else if (rand_int[i] > 248) {
        status1[i] = 'Норма';
      } else {
        status1[i] = 'Плохо';
      }
      if (rand_int[i] ==0) {
        status1[i] = '-';
      }
    }

    let status2 = []
    //let percent = 0.85
    for (let i = 0; i <= 11; i++) {
      if (target[i] < rand_int2[i]) {
        status2[i] = 'Отлично';
      } else if (rand_int2[i] > 248) {
        status2[i] = 'Норма';
      } else {
        status2[i] = 'Плохо';
      }
      if (rand_int2[i] ==0) {
        status2[i] = '-';
      }
    }

    let day_arr = []

    for (let i = 0; i <= 12; i++) {
      let obj = {
        time: day_shift[i],
        result: rand_int[i],
        target: target[i],
        status: status1[i]
      }
      day_arr.push(obj);
    }


    let night_arr = []

    for (let i = 0; i <= 12; i++) {
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
  asyncComputed: {
    sum() {
      const total = this.x + this.y
      return new Promise(resolve =>
          setTimeout(() => resolve(total), 1000)
      )
    },
  }
}

</script>
<style scoped>

@media screen and (min-width: 2280px) {
  .out_table {
    font-size: 100px;
  }
  .title{
    font-size: 100px;
  }
}

@media screen and (min-width: 1280px) {
  .out_table {
    font-size: 30px;
  }
  .title{
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