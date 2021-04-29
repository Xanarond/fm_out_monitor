<template>
  <div>
    <DxPivotGrid
        id="pivot"
        :allow-sorting-by-summary="true"
        :allow-sorting="true"
        :allow-filtering="true"
        :allow-expand-all="true"
        :show-borders="true"
        :data-source="dataSource"
        @cell-prepared="onCellPrepared"
    >
      <DxFieldChooser :enabled="false"/>
    </DxPivotGrid>
  </div>
</template>
<script>
import DxPivotGrid, {DxFieldChooser} from 'devextreme-vue/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { createStore } from 'devextreme-aspnet-data-nojquery';


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
        store: createStore({
          loadUrl: 'http://192.168.201.34:8081/api/refreshPivotNight'
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
            area: 'column'
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
  methods:{
    onCellPrepared({ cell, area, cellElement }) {
      cell.area = area;
      if(this.isDataCell(cell) || this.isTotalCell(cell)) {
        const appearance = this.getConditionalAppearance(cell);
        Object.assign(cellElement.style, this.getCssStyles(appearance));
      }
    },
    isDataCell: function(cell) {
      return (cell.area === 'data' && cell.rowType === 'D' && cell.columnType === 'D');
    },
    isTotalCell(cell) {
      return (cell.type === 'T' || cell.type === 'GT' || cell.rowType === 'T' || cell.rowType === 'GT' || cell.columnType === 'T' || cell.columnType === 'GT');
    },
    getExcelCellFormat({ fill, font, bold }) {
      return {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: fill } },
        font: { color: { argb: font }, bold }
      };
    },
    getCssStyles({ font, bold }) {
      return {
        // 'background-color': `#${fill}`,
        color: `#${font}`,
        'font-weight': bold ? 'bold' : undefined,
        'text-align': 'center',
        'font-size': '30px'
      };
    },
    getConditionalAppearance(cell) {
      if(this.isTotalCell(cell)) {
        return { fill: '#F2F2F2', font: 'ffffff', bold: true };
      } else {
        const { value } = cell;
        if(value < 20) {
          return { font: 'e7000a', fill: 'FFC7CE'};
        }
        if(value > 25) {
          return { font: '01e001', fill: 'C6EFCE' };
        }
        return { font: '0d5dff', fill: 'FFEB9C' };
      }
    }
  }
};
</script>
<style scoped>
#pivot div{
  text-align: center !important;
  font-size: 30px;
}
</style>
