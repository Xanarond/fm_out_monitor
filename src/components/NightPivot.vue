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
        rtlEnabled: true,
        store: createStore({
          key: 'OrderID',
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
};
</script>
<style scoped>
#sales {
  margin-top: 80px;
}
#pivot{
  text-align: center;
}
tr{
  text-align: center;
  align-content: center;
}

.long-title h3 {
  font-family: "Segoe UI Light", "Helvetica Neue Light", "Segoe UI",
  "Helvetica Neue", "Trebuchet MS", Verdana;
  font-weight: 200;
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
