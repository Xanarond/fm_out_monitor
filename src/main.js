import Vue from "vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueApexCharts from "vue-apexcharts";
import VueMaterial from "vue-material";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.dark.css";
import "./dx.generic.custom-scheme.css";
import AsyncComputed from "vue-async-computed";
// import dotenv from "dotenv";
import router from "./router";
import App from "./App.vue";

Vue.config.productionTip = true;
Vue.config.silent = true;
Vue.component("VueCtkDateTimePicker", VueCtkDateTimePicker);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(AsyncComputed);
Vue.use(VueApexCharts);
Vue.use(VueMaterial);

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
