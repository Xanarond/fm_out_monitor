<template>
  <div id="pivot">
    <b-container fluid="">
        <h1>Night Shift</h1>
        <b-row>
          <b-col>
            <NightPivot/>
          </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import NightPivot from '../components/NightPivot'
export default {
  name: "DayShiftPivotPage",
  components: {NightPivot}
}
</script>

<style scoped>

</style>