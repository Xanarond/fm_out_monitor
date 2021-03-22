<template>
  <div>
    <b-container fluid="">
      <b-row>
        <b-col>
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


export default {
  name: "TableComponent",
  created() {
    let target = Array(12).fill('250')

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

    /*//let item = '<b-img src="https://i.ibb.co/x2NyKt8/in-time.png" fluid alt="Responsive image"></b-img>'
     let intime = 'https://i.ibb.co/x2NyKt8/in-time.png'
     let delay = 'https://i.ibb.co/GVRQRk9/delay.png'
    let status = []
    for (let i = 0; i <= 12; i++) {
      status[i] = target < rand_int ? intime : delay;
    }*/

    let day_arr = []

    for (let i = 0; i <= 11; i++) {
      let obj = {
        hours: day_shift[i],
        total: rand_int[i],
        target: target[i],
        // status: status[i]
      }
      day_arr.push(obj);
    }

    let night_arr = []

    for (let i = 0; i <= 11; i++) {
      let obj = {
        hours: night_shift[i],
        total: rand_int2[i],
        target: target[i],
        // status: status[i]
      }
      night_arr.push(obj);
    }

    this.$data.day_shift = day_arr
    this.$data.night_shift = night_arr

    let tr = document.getElementsByTagName('tr');
    console.log(tr)
   tr.style.backround = 'red'
    /*if (target >= day_shift && night_shift){

    }*/
  },

  data() {
    return {
      fields: ['hours', 'target', 'total'],
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
.out_table {
  border: 1px solid #000000;
}

@media screen and (min-width: 2280px) {
  .out_table {
    font-size: 60px;
  }
}
</style>