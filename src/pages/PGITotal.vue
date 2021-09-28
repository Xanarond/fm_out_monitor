<template>
  <div>
    <b-container fluid>
      <b-col class="pt-2">
        <h1>Pick Task</h1>
        <b-row class="pt-2">
          <b-col>
            <PGITable :url="this.$data.link" :field="this.$data.columns"/>
          </b-col>
        </b-row>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import PGITable from "@/components/PGITable";

export default {
  name: "PGITotal",
  components: { PGITable },
  data() {
    return {
      link: '/getPivotPickTask',
      columns: ["Operation Area Code", "Number of Pick Task", "Not Picked", "Not Pick Consolidated", "Pick Consolidated", "Progress"],
    };
  },
};
</script>

<style scoped>

</style>
