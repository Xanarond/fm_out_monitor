<template>
  <div class="container-fluid pt-3">
    <div class="col" style="padding-left: 4rem;">
<!--      <DxSearchPanel
          :visible="true"
          :width="240"
          placeholder="Поиск..."
      />-->
      <DxDataGrid
          :allow-column-reordering="true"
          :data-source="views"
          :show-borders="true"
          :column-width="180"
          :noDataText="'The data updating now, and it takes several minutes.'"
      >
        <DxFilterRow
            :visible="showFilterRow"
            alignment="center"
        />
<!--        <DxExport
            :enabled="true"
            :allow-export-selected-data="true"
            file-name="Delayed_trucks"
        />-->
<!--        <DxSelection mode="multiple"/>-->
        <DxHeaderFilter
            :visible="showHeaderFilter"
            :allow-header-filtering="true"
        />
        <!--        data-type="date" format="dd.MM.yyyy"-->
        <DxScrolling column-rendering-mode="virtual" row-rendering-mode="infinite"/>
        <DxColumn data-field="Num" alignment="center" caption="Номер"/><!--:group-index="0"-->
        <DxColumn data-field="type_postavki" alignment="center" caption="Тип поставки"/>
        <DxColumn :width="200" data-field="plan_date" caption="Планируемая дата"
                  alignment="center"/>
        <DxColumn data-field="nomer_truck" caption="Номер" alignment="center"/>
        <DxColumn data-field="status" caption="Статус" alignment="center"/>
        <DxColumn data-field="date_startunload" caption="Дата выгрузки" sort-order="desc"
                  alignment="center"/>
        <DxColumn :width="170" data-field="time_startunload" caption="Время начала выгрузки" data-type="datetime"
                  format="H:mm" :allow-filtering="false"
                  alignment="center"/>
        <DxColumn :width="200" data-field="time_endunload" caption="Время окончания выгрузки" data-type="datetime"
                  format="H:mm" :allow-filtering="false"
                  alignment="center"/>
        <DxColumn data-field="nomer_postavki" caption="Номер поставки" alignment="center"/>
<!--        <DxGroupPanel :visible="true"/>-->
<!--        <DxGrouping :auto-expand-all="autoExpandAll"/>-->
        <DxPaging :page-size="30"/>
        <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="[10, 20, 50, 100, 250, 500]"
        />
<!--        <DxSearchPanel :visible="true"/>-->
      </DxDataGrid>
    </div>
  </div>
</template>

<script>

import {
  DxColumn,
  DxDataGrid,
  DxFilterRow, DxHeaderFilter,
  DxPager,
  DxPaging,
  DxScrolling,
} from "devextreme-vue/data-grid";
import http from "../http-common";

export default {
  name: "InboundDashboard",
  components: {
    DxDataGrid,
    DxFilterRow,
    DxColumn,
    DxScrolling,
    DxPaging,
    DxPager,
    DxHeaderFilter,
  },
  data() {
    const applyFilterTypes = [
      {
        key: 'auto',
        name: 'Immediately',
      },
      {
        key: 'onClick',
        name: 'On Button Click',
      }];
    const
      currentFilter = applyFilterTypes[0].key;
    return {
      dialog: false,
      defaultVisible: false,
      views: null,
      autoExpandAll: true,
      showFilterRow: true,
      showHeaderFilter: true,
      showModal: false,
      currentFilter,
    };
  },
  created() {
    this.updateInbound();
  },
  methods: {
    updateInbound() {
      http.get("/getInbound")
        .then(res => {
          ({ data: this.views } = res);
        }).catch(e => e);
    },
    stopTimer() {
      if (this.interval) {
        window.clearInterval(this.interval);
      }
    },
    startTimer() {
      this.stopTimer();
      this.interval = window.setInterval(() => {
        this.updateInbound();
      }, 900000);
    },
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

</style>
