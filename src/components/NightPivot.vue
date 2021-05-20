<template>
  <div class="pb-2">
    <b-row class="justify-content-center pb-3">
      <div class="d-inline-block  mt-auto mb-auto" style="color: #fff">Period:</div>
      <VueCtkDateTimePicker :dark=true :label="'Select Date'" :noButton=true :noHeader=true
                            :noValueToCustomElem=true :range=true
                            class="justify-content-start d-inline-block mt-auto mb-auto"
                            style="width: 380px;margin:0 5px 5px;"/>
      <button class="d-inline-block ml-1 mt-auto mb-auto btn btn-secondary text-white mr-2" type="button"
              v-on:click="getDate()">Refresh
      </button>
    </b-row>
    <DxPivotGrid
        id="pivot"
        :allow-expand-all="true"
        :allow-filtering="true"
        :allow-sorting="true"
        :allow-sorting-by-summary="true"
        :data-source="dataSource"
        :show-borders="true"
        @cell-prepared="onCellPrepared"
    >
      <DxFieldChooser :enabled="false"/>
    </DxPivotGrid>
  </div>
</template>
<script>
import DxPivotGrid, {DxFieldChooser} from 'devextreme-vue/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import {createStore} from 'devextreme-aspnet-data-nojquery';


export default {
  name: "DayPivot",
  components: {
    DxPivotGrid,
    DxFieldChooser
  },
  created() {
  },
  data() {
    return {
      dataSource: new PivotGridDataSource({
        rtlEnabled: true,
        store: createStore({
          loadUrl: 'http://localhost:8081/api/refreshPivotNight'
        }),
        fields: [
          {
            caption: 'Person',
            dataField: 'person',
            dataType: 'text',
            area: 'row',
            sortBySummaryField: 'person',
            sortOrder: 'desc',
            width: 300
          },
          {
            caption: 'Pick_time',
            dataField: 'pick_time',
            dataType: 'datetime',
            area: 'column',
          },
          {
            caption: 'Value_Person',
            dataField: 'person',
            dataType: 'text',
            area: 'data',
          },
        ],
      })
    };
  },
  methods: {
    onCellPrepared({cell, area, cellElement}) {
      cell.area = area;
      if (this.isDataCell(cell) || this.isTotalCell(cell)) {
        const appearance = this.getConditionalAppearance(cell);
        Object.assign(cellElement.style, this.getCssStyles(appearance));
      }
    },
    isDataCell: function (cell) {
      return (cell.area === 'data' && cell.rowType === 'D' && cell.columnType === 'D');
    },
    isTotalCell(cell) {
      return (cell.type === 'T' || cell.type === 'GT' || cell.rowType === 'T' || cell.rowType === 'GT' || cell.columnType === 'T' || cell.columnType === 'GT');
    },
    getExcelCellFormat({fill, font, bold}) {
      return {
        fill: {type: 'pattern', pattern: 'solid', fgColor: {argb: fill}},
        font: {color: {argb: font}, bold}
      };
    },
    getCssStyles({font, bold}) {
      return {
        // 'background-color': `#${fill}`,
        color: `${font}`,
        'font-weight': bold ? 'bold' : undefined,
        'text-align': 'center',
        'font-size': '32px'
      };
    },
    getConditionalAppearance(cell) {
      if (this.isTotalCell(cell)) {
        return {fill: '#F2F2F2', font: 'ffffff', bold: true};
      } else {
        const {value} = cell;
        if (value < 20) {
          return {font: '#ffff00', fill: 'FFC7CE', bold: true};
        }
        if (value > 25) {
          return {font: '#03fd50', fill: 'C6EFCE', bold: true};
        }
        return {font: '#07edf9', fill: 'FFEB9C', bold: true};
      }
    }
  }
};
</script>
<style scoped>
#pivot {
  text-align: center !important;
  font-size: 32px;
  font-weight: bold;
  font-family: "Expo M", serif;
}
</style>
