import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import AsyncComputed from 'vue-async-computed'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueApexCharts from 'vue-apexcharts'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.dark.css';
import './dx.generic.custom-scheme.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(AsyncComputed)
Vue.use(VueApexCharts)
Vue.use(VueMaterial)

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
