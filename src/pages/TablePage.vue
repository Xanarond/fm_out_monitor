<template>
  <div id="app">
    <HeaderComponent/>
    <TableComponent/>
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent";
import HeaderComponent from "@/components/HeaderComponent";

export default {
  name: 'TablePage',
  components: {
    TableComponent,
    HeaderComponent,
  }
}
</script>

<style scoped>

</style>