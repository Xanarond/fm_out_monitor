<template>
<div>
  <b-container fluid>
    <b-col class="pt-2">
      <h1>Not Picked</h1>
      <b-row class="pt-2">
        <b-col>
          <PGITable :url="this.link" :field="columns"/>
        </b-col>
      </b-row>
    </b-col>
  </b-container>
</div>
</template>

<script>
import PGITable from "@/components/PGITable";

export default {
  name: "PGIHourly",
  components: { PGITable },
  data() {
    return {
      link: '/getPivotNotPicked',
      columns: ['PGI', 'B01', 'B03-04', 'B16-18', 'DUMMY', 'ENT', 'HVA', 'MEZ', 'TOF'],
    };
  },
};
</script>

<style scoped>

</style>
