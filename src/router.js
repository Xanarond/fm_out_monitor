import Vue from "vue";
import Router from "vue-router";
import TablePage from "../src/pages/TablePage";
import PageNotFound from "../src/pages/PageNotFound";
import DayShiftChartPage from "../src/pages/DayShiftChartPage";
import NightShiftChartPage from "../src/pages/NightShiftChartPage";
import DayShiftPivotPage from "./pages/DayShiftPivotPage";
import NightShiftPivotPage from "./pages/NightShiftPivotPage";
import PickingPage from "../src/pages/PickingPage";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: TablePage },
    { path: "/day", component: DayShiftChartPage },
    { path: "/night", component: NightShiftChartPage },
    { path: "/dayp", component: DayShiftPivotPage },
    { path: "/nightp", component: NightShiftPivotPage },
    { path: "/monitor", component: PickingPage },
    { path: "*", component: PageNotFound }
  ]
});
