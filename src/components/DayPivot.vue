<template>
  <div class="pb-2">
    <b-row class="justify-content-center pb-3">
      <div class="d-inline-block  mt-auto mb-auto" style="color: #fff">Period:</div>
      <VueCtkDateTimePicker v-model="period.cur_date" :dark=true :label="'Select Date'" :noButton=true
                            :noHeader=true :noValueToCustomElem=true
                            :onlyDate=true class="justify-content-start d-inline-block mt-auto mb-auto"
                            formatted="L"
                            style="width: 380px;margin:0 5px 5px;"/>
      <button class="d-inline-block ml-1 mt-auto mb-auto btn btn-secondary text-white mr-2" type="button"
              v-on:click="updateStore()">Refresh
      </button>
    </b-row>
    <DxPivotGrid
        id="pivot"
        :allow-expand-all="true"
        :allow-filtering="true"
        :allow-sorting="true"
        :allow-sorting-by-summary="true"
        :data-source="DayPivot"
        :show-borders="true"
        @cell-prepared="onCellPrepared"
    >
      <DxFieldChooser :enabled="false"/>
    </DxPivotGrid>
  </div>
</template>
<script>

import DxPivotGrid, { DxFieldChooser } from 'devextreme-vue/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import moment from "moment";
import { createStore } from "devextreme-aspnet-data-nojquery";
import axios_conf from "../http-common";
/**
 * @type {PivotGridDataSource}
 */
const DayPivot = new PivotGridDataSource({
  rtlEnabled: true,
  store: createStore({
    loadUrl: `${axios_conf.defaults.baseURL}/getPivotRefreshDayShift`,
    loadParams: {
      cur_date: moment()
        .format('YYYY-MM-DD')
        .slice(0, 10),
      past_date: moment()
        .subtract(1, 'day')
        .format('YYYY-MM-DD')
        .slice(0, 10),
    },
    onUpdating() {
      this.loadParams = {
        cur_date: this.cur_date,
        past_date: this.past_date,
      };
    },
  }),
  fields: [
    {
      caption: 'Worker',
      dataField: 'worker',
      dataType: 'text',
      area: 'row',
      sortBySummaryField: 'worker',
      sortOrder: 'desc',
      width: 300,
    },
    {
      caption: 'Pick_time',
      dataField: 'pick_time',
      dataType: 'datetime',
      area: 'column',
      sortBySummaryField: 'pick_time',
      sortOrder: 'asc',
    },
    {
      caption: 'Value_Worker',
      dataField: 'worker',
      dataType: 'text',
      area: 'data',
    },
  ],
});

export default {
  name: 'DayPivot',
  components: {
    DxPivotGrid,
    DxFieldChooser,
  },
  data() {
    return {
      DayPivot,
      period: {
        cur_date: moment()
          .format('YYYY-MM-DD'),
        past_date: moment(this.cur_date)
          .subtract(1, 'day')
          .format('YYYY-MM-DD'),
      },
    };
  },
  methods: {
    updateStore() {
      this.DayPivot = new PivotGridDataSource({
        rtlEnabled: true,
        store: createStore({
          loadUrl: `${axios_conf.defaults.baseURL}/getPivotRefreshDayShift`,
          loadParams: {
            cur_date: this.$data.period.cur_date.slice(0, 10),
            past_date: moment(this.$data.period.cur_date.slice(0, 10))
              .subtract(1, 'day')
              .format('YYYY-MM-DD'),
          },
          onUpdating() {
            this.loadParams = {
              cur_date: this.cur_date,
              past_date: this.past_date,
            };
          },
        }),
        fields: [
          {
            caption: 'Worker',
            dataField: 'worker',
            dataType: 'text',
            area: 'row',
            sortBySummaryField: 'worker',
            sortOrder: 'desc',
            width: 300,
          },
          {
            caption: 'Pick_time',
            dataField: 'pick_time',
            dataType: 'datetime',
            area: 'column',
            sortOrder: 'asc',
          },
          {
            caption: 'Value_Worker',
            dataField: 'worker',
            dataType: 'text',
            area: 'data',
          },
        ],
      });
    },
    onCellPrepared({
      cell,
      area,
      cellElement,
    }) {
      // eslint-disable-next-line no-param-reassign
      cell.area = area;
      if (this.isDataCell(cell) || this.isTotalCell(cell)) {
        const appearance = this.getConditionalAppearance(cell);
        Object.assign(cellElement.style, this.getCssStyles(appearance));
      }
    },
    isDataCell(cell) {
      return (cell.area === 'data' && cell.rowType === 'D' && cell.columnType === 'D');
    },
    isTotalCell(cell) {
      return (cell.type === 'T' || cell.type === 'GT' || cell.rowType === 'T' || cell.rowType === 'GT' || cell.columnType === 'T' || cell.columnType === 'GT');
    },
    getExcelCellFormat({
      fill,
      font,
      bold,
    }) {
      return {
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: fill },
        },
        font: {
          color: { argb: font },
          bold,
        },
      };
    },
    getCssStyles({
      font,
      bold,
    }) {
      return {
        // 'background-color': `#${fill}`,
        color: `${font}`,
        'font-weight': bold ? 'bold' : undefined,
        'text-align': 'center',
        'font-size': '30px',
      };
    },
    getConditionalAppearance(cell) {
      if (this.isTotalCell(cell)) {
        return {
          fill: '#F2F2F2',
          font: 'ffffff',
          bold: true,
        };
      }
      const { value } = cell;
      if (value < 20) {
        return {
          font: '#ffff00',
          bold: true,
        };
      }
      if (value > 25) {
        return {
          font: '#00ff4e',
          bold: true,
        };
      }
      return {
        font: '#07edf9',
        bold: true,
      };
    },
    stopTimer() {
      if (this.interval) {
        window.clearInterval(this.interval);
      }
    },
    startTimer() {
      this.stopTimer();
      this.interval = window.setInterval(() => {
        this.updateStore();
      }, 600000);
    },
  },
  created() {
    this.updateStore();
  },
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    this.stopTimer();
  },
};
</script>
<style scoped>
#pivot div {
  text-align: center !important;
  font-size: 32px;
  font-weight: bold;
  font-family: "Expo M", serif;
}
</style>
