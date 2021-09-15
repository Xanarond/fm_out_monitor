<template>
  <div id="chart">
    <b-container fluid="">
      <b-row class="justify-content-center mt-2">
        <div class="d-inline-block mt-auto mb-auto" style="color: #fff">
          Period:
        </div>
        <VueCtkDateTimePicker
            v-model="period.cur_date"
            :dark="true"
            :label="'Select Date'"
            :noButton="true"
            :noHeader="true"
            :noValueToCustomElem="true"
            :onlyDate="true"
            class="justify-content-start d-inline-block mt-auto mb-auto"
            formatted="L"
            style="width: 380px; margin: 0 5px 5px"
        />
        <button
            class="
            d-inline-block
            ml-1
            mt-auto
            mb-auto
            btn btn-secondary
            text-white
            mr-2
          "
            type="button"
            v-on:click="getCountData()"
        >
          Refresh
        </button>
      </b-row>
      <b-row class="ml-2 mt-3 mr-2">
        <b-col></b-col>
        <b-col fluid="md" cols="4" class="p-2" style="background: #29292d; border: #fff solid 1px; width: 300px;">
          <h2 class="text-right">Manifest - Normal D/O</h2>
          <DonutApex :values="Object.values(this.$data.normal_lines)"
                     :key="Object.keys(this.$data.normal_lines)" label="Completed"/>
        </b-col>
        <b-col fluid="md" cols="4" class="p-2" style="background: #29292d; border: #fff solid 1px">
          <h2 class="text-right">Manifest - Urgent D/O</h2>
          <DonutApex :values="Object.values(this.$data.urgent_manifests)" :key="Object.keys(this.$data.urgent_manifests)"/>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row class="ml-2 mr-2">
        <b-col></b-col>
        <b-col class="p-2" cols="4" style="background: #29292d; border: #fff solid 1px">
          <h2 class="text-right">Lines - Normal D/O</h2>
          <DonutApex :values="this.$data.normal_lines"
                     :key="this.$data.normal_lines" label="Completed"/>
        </b-col>
        <b-col class="p-2" cols="4" style="background: #29292d; border: #fff solid 1px">
          <h2 class="text-right">Lines - Urgent D/O</h2>
          <DonutApex :values="Object.values(this.$data.urgent_lines)"
                     :key="Object.keys(this.$data.urgent_lines)"/>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col id="backlog_col">
          <h2 class="text-center font-weight-bold">BACKLOG = 10,543</h2>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import moment from "moment";
import http from "@/http-common";
// import DonutApex from "../components/DonutApex";

export default {
  name: "MLPage",
  components: {
    // DonutApex,
  },
  data() {
    return {
      period: {
        cur_date: moment()
          .format("YYYY-MM-DD"),
        past_date: moment(this.cur_date)
          .subtract(1, "day")
          .format("YYYY-MM-DD"),
      },
      normal_lines: [],
      urgent_lines: [],
      normal_manifests: [],
      urgent_manifests: [],
      colors: ['#0037fc', '#ff0000', '#f1ff00'],
    };
  },
  methods: {
    getCountData() {
      http.get("/getMLStatus", {
        params: {
          cur_date: this.$data.period.cur_date.slice(0, 10),
        },
      })
        .then((res) => {
          // const norm_l = ;
          /* const urg_l = res.data.line_urgent[0];
          const urg_m = res.data.urgent_manifests[0];
          const norm_m = res.data.normal_manifests[0]; */
          const norm_l = Object.values(res.data.line_norm[0]);
          const urg_l = Object.values(res.data.line_urgent[0]);
          this.normal_lines = norm_l;
          this.urgent_lines = urg_l;
          console.log(this.normal_lines);
          /* this.normal_lines = { ...norm_l };
          this.urgent_lines = { ...urg_l };
          this.normal_manifests = { ...norm_m };
          this.urgent_manifests = { ...urg_m }; */
        })
        .catch((e) => e === "Нет ответа от сервера");
    },
    getRandom() {
      const urg_l = [];
      const norm_l = [];
      const urg_m = [];
      const norm_m = [];

      for (let i = 0; i <= 2; i++) {
        urg_l[i] = Math.floor(Math.random() * 100);
        norm_l[i] = Math.floor(Math.random() * 100);
        urg_m[i] = Math.floor(Math.random() * 100);
        norm_m[i] = Math.floor(Math.random() * 100);
      }

      this.normal_lines = { ...norm_l };
      this.urgent_lines = { ...urg_l };
      this.normal_manifests = { ...norm_m };
      this.urgent_manifests = { ...urg_m };
    },
    stopTimer() {
      if (this.interval) {
        window.clearInterval(this.interval);
      }
    },
    startTimer() {
      this.stopTimer();
      this.interval = window.setInterval(() => {
        this.getCountData();
      }, 300000);
    },
  },
  created() {
    this.getRandom();
  },
  mounted() {
    this.getCountData();
    /* window.setInterval(() => {
      this.getRandom();
    }, 30000); */
  },
};
</script>

<style scoped>
#backlog_col h2 {
  font-size: 80px !important;
}
</style>
