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
        <DxColumn data-field="client" alignment="center" caption="Клиент"/>
        <DxColumn data-field="type_postavki" alignment="center" caption="Тип поставки"/>
        <DxColumn data-field="normativ_v" alignment="center" caption="Норматив выгрузки (из графика)"/><!--:group-index="0"-->
        <DxColumn data-field="plan_prihoda" alignment="center" caption="План прихода"/>
        <DxColumn data-field="nomer_truck" alignment="center" caption="Номер ТС"/>
        <DxColumn data-field="status" alignment="center" caption="Статус выгрузки"/>
        <DxColumn data-field="unload_do" alignment="center" caption="Выгрузить ДО (из графика)"/>
        <DxColumn data-field="arrival_datetime" alignment="center" caption="Факт Приезда (из графика)"/>
        <DxColumn data-field="start_unl_datetime" alignment="center" caption="Факт выгрузки начало (из графика)"/>
        <DxColumn data-field="fin_unl_datetime" alignment="center" caption="Факт выгрузки конец (из графика)"/>
        <DxColumn data-field="grade" alignment="center" caption="Оценка работы (из графика)"/>
        <DxColumn data-field="nomer_postavki" alignment="center" caption="Номер Входящей поставки(из графика)"/>
<!--        <DxGroupPanel :visible="true"/>-->
<!--        <DxGrouping :auto-expand-all="autoExpandAll"/>-->
<!--        data-type="datetime" format="dd/MM/yy. H:mm"-->
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
