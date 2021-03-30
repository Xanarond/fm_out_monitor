<template>
  <div class="example">
    <apexcharts type="bar" :options="chartOptions" :series="series"></apexcharts>
    <button @click="updateChart">Update!</button>
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'ChartComponent',
  components: {
    apexcharts: VueApexCharts,
  },
  created() {
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'bar',
        },
        fill: {
          type: 'gradient',
          colors: [function ({value}) {
            if (250 < value) {
              return '#00AF50';
            } else if (value >= 200) {
              return '#0071C0';
            } else {
              return '#ff0000';
            }
          }],
        },
        annotations: {
          yaxis: [
            {
              y: 250,
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                style: {
                  color: '#fff',
                  background: '#00E396'
                },
                text: 'Target Point'
              }
            }
          ],
        },
        yaxis: {
          labels: {
            style: {
              colors: '#fff',
              fontSize: '12px'
            }
          },
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: '#fff',
              fontSize: '12px'
            }
          },
        }
      },
      series: [{
        // name: 'series-1',
        data: [230, 350, 45],
      }],
    }
  },
  mounted() {
    // задаем массивы для временных промежутков
    let time_zone = []

    for (let i = 0; i <= 23; i++) {
      time_zone[i] = i <= 9 ? `0${i}:00` : `${i}:00`;
    }

    let day_shift = time_zone.slice(8, 20)

    let rand_int = []

    for (let i = 0; i <= 11; i++) {
      rand_int[i] = Math.floor(Math.random() * 1000)
    }

    let color_scheme = []

    this.chartOptions = {
      colors: color_scheme
    };
    this.chartOptions.xaxis = {
      categories: day_shift
    }
    this.series = [{
      data: rand_int
    }]
  },
  methods: {
    updateChart() {
      // задаем массивы для временных промежутков
      let time_zone = []

      for (let i = 0; i <= 23; i++) {
        time_zone[i] = i <= 9 ? `0${i}:00` : `${i}:00`;
      }

      let day_shift = time_zone.slice(8, 20)

      let rand_int = []

      for (let i = 0; i <= 11; i++) {
        rand_int[i] = Math.floor(Math.random() * 1000)
      }
      console.log(rand_int)

      let color_scheme = []

      for (let i = 0; i <= 11; i++) {
        if (250 < rand_int[i]) {
          color_scheme[i] = '#00AF50';
        } else if (rand_int[i] >= 200) {
          color_scheme[i] = '#0071C0';
        } else {
          color_scheme[i] = '#ff0000';
        }

        this.chartOptions = {
          colors: color_scheme
        };
        this.chartOptions.xaxis = {
          categories: day_shift
        }
        this.series = [{
          data: rand_int
        }]
        console.log(this.chartOptions.colors)
      }
    }
  }
}
</script>

