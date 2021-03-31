import Vue from "vue";
import Router from "vue-router";
import TablePage from "@/pages/TablePage";
import PageNotFound from "@/pages/PageNotFound";
import DayShiftChartPage from "@/pages/DayShiftChartPage";
import NightShiftChartPage from "@/pages/NightShiftChartPage";


Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {path: "/", component: TablePage,},
        {path: "/day", component: DayShiftChartPage},
        {path: "/night", component: NightShiftChartPage},
        {path: '*', component: PageNotFound}
    ]
});
