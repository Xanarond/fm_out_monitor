import Vue from "vue";
import Router from "vue-router";
import TablePage from "@/pages/TablePage";
import ChartPage from "@/pages/ChartPage";
import PageNotFound from "@/pages/PageNotFound";


Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {path: "/", component: TablePage,},
        {path: "/charts", component: ChartPage},
        {path: '*', component: PageNotFound}
    ]
});
