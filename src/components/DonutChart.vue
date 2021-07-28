<script>
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  props: ['values', 'labels', 'backgroundColor'],
  data() {
    return {
      chartdata: {
        labels: this.labels,
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#0037fc', '#ff0000', '#f1ff00'],
            borderWidth: 0,
            data: this.values,
          },
        ],
      },
      options: {
        tooltips: {
          // enabled: false,
          position: 'nearest',
          intersect: false,
        },
        legend: {
          labels: {
            font: {
              size: 14,
              color: "rgb(255,255,255)",
            },
            usePointStyle: true,
          },
          position: 'right',
        },
        responsive: true,
        maintainAspectRatio: false,
        showAllTooltips: true,
        segmentShowStroke: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
