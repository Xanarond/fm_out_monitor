import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from '@/pages/PageNotFound';

Vue.use(Router);
const TablePage = () => import('@/pages/TablePage');
const DayShiftChartPage = () => import('@/pages/DayShiftChartPage');
const NightShiftChartPage = () => import('@/pages/NightShiftChartPage');
const DayShiftPivotPage = () => import('@/pages/DayShiftPivotPage');
const NightShiftPivotPage = () => import('@/pages/NightShiftPivotPage');
const PickingPage = () => import('@/pages/PickingPage');
const PGITotal = () => import('@/pages/PGITotal');
const PGIHourly = () => import('@/pages/PGIHourly');
const Inbound = () => import('@/pages/InboundDashboard');
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: TablePage,
    },
    {
      path: '/day',
      component: DayShiftChartPage,
    },
    {
      path: '/night',
      component: NightShiftChartPage,
    },
    {
      path: '/dayp',
      component: DayShiftPivotPage,
    },
    {
      path: '/nightp',
      component: NightShiftPivotPage,
    },
    {
      path: '/monitor',
      component: PickingPage,
    },
    {
      path: '/inbound',
      component: Inbound,
    },
    {
      path: '/pick_task',
      component: PGITotal,
      props: true,
    },
    {
      path: '/pgi_np',
      component: PGIHourly,
      props: true,
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
});
