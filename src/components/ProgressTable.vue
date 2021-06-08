<template>
  <div>
    <b-container fluid="">
      <h1 id="progress" class="pb-3 pl-3">Outbound Progress monitoring</h1>
      <b-row id="sub-head" class="pb-3 pr-3 pl-3">
        <b-col cols="3">
          <h2 class="text-left">PGI: {{ date }}</h2>
        </b-col>
        <b-col cols="2">
          <b-form-select id="form" v-model="filter.count"
                         :options="counts"
          ></b-form-select>
        </b-col>
        <b-col cols="2">
          <b-form-select id="form" v-model="filter.timestamp"
                         :options="timestamp"
          ></b-form-select>
        </b-col>
      </b-row>
      <b-col class="pb-1">
        <b-table
            :bordered="true"
            :fields="fields"
            :filter="filter"
            :filter-function="filterFunction"
            :head-variant="col"
            :items="items"
            :table-variant="tableVariant"
            class="out_table"
            hover striped
        >
        </b-table>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import http from '@/http-common';
import $ from 'jquery';

export default {
  name: 'ProgressTable',
  data() {
    return {
      fields: [{
        key: 'Con No',
        sortable: true,
        filterByFormatted: true,
      },
      {
        key: 'Status',
        sortable: true,
      },
      {
        key: 'PGI Datetime',
      }, 'Total', 'To Be Picked', 'To Be Consol', 'Packing Status', 'Manifest Packing Status',
      ],
      total_fields: ['target', 'total'],
      tableVariant: 'dark',
      col: 'dark',
      items: [],
      date: '',
      hour: '',
      filter: {
        count: null,
        timestamp: null,
      },
      counts: [
        {
          text: 'All',
          value: null,
        },
        {
          text: 'Moscow',
          value: 'MCK',
        },
        {
          text: 'Region',
          value: 'REG',
        },
        {
          text: 'AIR',
          value: 'AIR',
        },
        {
          text: 'VIR',
          value: 'VIR',
        },
      ],
      timestamp: [
        {
          text: 'All',
          value: null,
        },
      ],
    };
  },
  methods: {
    getCounters() {
      http.get('/refreshProgress', {})
        .then((res) => {
          const dates = [];
          const hours = [];

          const timestamp = new Set();

          res.data.forEach(((item) => {
            dates.push(item['PGI Datetime'].slice(0, 10));
            hours.push(item['PGI Datetime'].slice(11, 16));
            timestamp.add(item['PGI Datetime']);
          }));

          const timestamp_val = [...timestamp];
          const day_ts = [{
            text: 'All',
            value: null,
          }];

          for (let i = 0; i <= timestamp_val.length - 1; i++) {
            const timestamp_obj = {
              text: timestamp_val[i],
              value: timestamp_val[i],
            };

            day_ts.push(timestamp_obj);
          }

          this.timestamp = day_ts;
          this.items = res.data;
          this.hour = hours.slice(-1)[0];
          this.date = dates.slice(-1)[0];

          $(() => {
            $('td:contains("All Consoled")')
              .css('color', '#ffff00');
            $('td:contains("All Picked")')
              .css('color', '#00ffff');
            $('td:contains("Progress")')
              .css('color', '#fff');
            $('td:contains("Completed")')
              .css('color', '#ffff00');
            $('td:contains("Not Packed")')
              .css('color', '#00ffff');
            $('td:contains("In Progress")')
              .css('color', '#fff');
          });
        })

        .catch((e) => e === 'Нет ответа от сервера');
    },
    /**
     *
     * @param row поля исходной таблицы
     * @param val фильтр
     * @returns {boolean} значение при (не)совпадении строк
     */
    filterFunction(row, val) {
      const {
        count: c,
        timestamp: t,
      } = val;
      return [
        !c || c === row['Con No'].slice(0, 3),
        !t || t === row['PGI Datetime'],
      ].every(Boolean);
    },
    stopTimer() {
      if (this.interval) {
        window.clearInterval(this.interval);
      }
    },
    startTimer() {
      this.stopTimer();
      this.interval = window.setInterval(() => {
        this.getCounters();
      }, 5000);
    },
  },
  mounted() {
    this.getCounters();
    this.startTimer();
  },
  beforeDestroy() {
    this.stopTimer();
  },
};
</script>

<style scoped>
#progress {
  text-align: left;
  font-size: 52px;
  color: #cfcfcf;
  font-family: "Expo M", serif;
}

#form {
  background-color: #6d6d6d;
  font-size: 30px;
  color: #fff
}

#sub-head h2 {
  color: #d8d8d8 !important;
  font-size: 50px !important;
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
    background-color: #6d6d6d;
    font-size: 18px;
    color: #fff
  }

  #sub-head h2 {
    color: #d8d8d8 !important;
    font-size: 32px !important;
    font-weight: bold;
  }
}
</style>
