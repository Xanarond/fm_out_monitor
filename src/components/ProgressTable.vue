<template>
  <div>
    <b-container fluid="">
      <h1 class="pb-3 pl-3" id="progress">Outbound Progress monitoring</h1>
      <b-row class="pb-3 pr-3 pl-3" id="sub-head">
        <b-col cols="3">
          <h2 class="text-left">PGI: {{ date }}</h2>
        </b-col>
        <b-col cols="2">
          <b-form-select id="form" :options="counts"
                         v-model="filter.count"
          ></b-form-select>
        </b-col>
        <b-col>
          <h2 class="text-right">{{ hour }}</h2>
        </b-col>
      </b-row>
      <b-col class="pb-1">
        <b-table
            :bordered="true"
            :fields="fields"
            :head-variant="col"
            :items="items"
            :table-variant="tableVariant"
            class="out_table"
            :filter="filter.count"
            striped hover
        >
          <b-tr>
            <b-th colspan="5"><span class="sr-only">Name and ID</span></b-th>
            <b-th variant="secondary">Type 1</b-th>
            <b-th variant="primary" colspan="4">Type 2</b-th>
            <b-th variant="danger">Type 3</b-th>
          </b-tr>
        </b-table>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import http from "@/http-common";
import $ from "jquery";

export default {
  name: "ProgressTable",
  data() {
    return {
      fields: [{
        key: 'Con No',
        sortable: true,
        filterByFormatted: true
      },
        {
          key: 'PGI Datetime',
        }, 'Total', 'To Be Picked', 'To Be Consol', 'Rack', 'Mezz', 'HVA', 'Packing Status', 'Manifest Packing Status',
        {
          key: 'Status',
          sortable: true,

        }],
      total_fields: ['target', 'total'],
      tableVariant: 'dark',
      col: 'dark',
      items: [],
      date: '',
      hour: '',
      filter: {
        count: null,
      },
      counts: [
        {
          text: 'All',
          value: null
        },
        {
          text: 'Moscow',
          value: 'MCK'
        },
        {
          text: 'Region',
          value: 'REG'
        },
        {
          text: 'Air',
          value: 'AIR'
        },
        {
          text: 'Vir',
          value: 'VIR'
        }
      ],
    }
  },
  methods: {
    getCounters() {
      http.get("/refreshProgress", {})
          .then(res => {
            let dates = []
            let hours = []
            res.data.forEach((item => {
              dates.push(item['PGI Datetime'].slice(0, 10))
              hours.push(item['PGI Datetime'].slice(11, 16))
            }))

            this.items = res.data
            this.hour = hours.slice(-1)[0]
            this.date = dates.slice(-1)[0]

            $(() => {
              $('td:contains("All Consoled")').css('color', '#ffff00')
              $('td:contains("All Picked")').css('color', '#00ffff')
              $('td:contains("Progress")').css('color', '#fff')
            });
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
  },
  mounted() {
    this.getCounters();
    this.startTimer()
  },
  beforeDestroy() {
    this.stopTimer()
  }
}
</script>

<style scoped>
#progress {
  text-align: left;
  font-size: 52px;
  color: #cfcfcf;
  font-family: "Expo M", serif;
}

#form {
  background-color: #ff0000;
  font-size: 32px;
  color: #fff
}

#sub-head h2 {
  color: #d8d8d8 !important;
  font-size: 32px !important;
  font-weight: bold;
}

table {
  font-weight: bold;
}

.out_table {
  font-size: 32px;
}

@media (max-width: 1600px) {
  .out_table {
    font-size: 18px;
  }

  #form {
    background-color: #ff0000;
    font-size: 18px;
    color: #fff
  }
}
</style>