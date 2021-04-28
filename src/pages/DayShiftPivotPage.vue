<template>
  <div id="pivot">
    <b-container fluid="">
        <h1>Day Shift</h1>
        <b-row>
          <b-col>
            <DayPivot/>
          </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import DayPivot from "../components/DayPivot";
export default {
  name: "DayShiftPivotPage",
  components: {DayPivot}
}
</script>

<style scoped>

</style>