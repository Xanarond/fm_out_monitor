<template>
  <div>
    <b-container fluid="">
      <h1 class="pb-3 pl-3" id="progress">Outbound Progress monitoring</h1>
      <b-row class="pb-3 pr-3 pl-3" id="sub-head">
        <b-col>
          <h2 class="text-left">PGI: XX.XX.XX HH.MM</h2>
        </b-col>
        <b-col>
          <h2 class="text-right">09:20</h2>
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
      fields: ['Con No', 'PGI Datetime', 'To be Picked', 'To be Consol', 'Rack', 'Mezz', 'HVA', 'Status'],
      total_fields: ['target', 'total'],
      tableVariant: 'dark',
      col: 'dark',
      items: []
    }
  },
  methods: {
    getCounters() {
      http.get("/refreshProgress", {})
          .then(res => {
            console.log(res.data)
            this.items = res.data

            $(() => {
              $('td:contains("All Con")').css('color', '#ffff00')
              // $('td:last-child').css('color', '#ffff00')
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
    }
  },
  mounted() {
    this.getCounters();
    // this.startTimer()
  },
  beforeDestroy() {
    // this.stopTimer()
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

#sub-head h2 {
  color: #d8d8d8 !important;
  font-size: 32px !important;
  font-weight: bold;
}

table {
  font-weight: bold;
}
</style>