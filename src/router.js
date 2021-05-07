import Vue from "vue";
import Router from "vue-router";
import TablePage from "@/pages/TablePage";
import PageNotFound from "@/pages/PageNotFound";
import DayShiftChartPage from "@/pages/DayShiftChartPage";
import NightShiftChartPage from "@/pages/NightShiftChartPage";
import DayShiftPivotPage from "./pages/DayShiftPivotPage";
import NightShiftPivotPage from "./pages/NightShiftPivotPage";
import PickingPage from "@/pages/PickingPage";


Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {path: "/", component: TablePage,},
        {path: "/day", component: DayShiftChartPage},
        {path: "/night", component: NightShiftChartPage},
        {path: "/dayp", component: DayShiftPivotPage},
        {path: "/nightp", component: NightShiftPivotPage},
        {path: "/progress", component: PickingPage},
        {path: '*', component: PageNotFound}
    ]
});
