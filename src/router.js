import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from '@/pages/PageNotFound';

Vue.use(Router);
// const TablePage = () => import('@/pages/TablePage');
// const DayShiftChartPage = () => import('@/pages/DayShiftChartPage');
// const NightShiftChartPage = () => import('@/pages/NightShiftChartPage');
const DayShiftPivotPage = () => import('@/pages/DayShiftPivotPage');
const NightShiftPivotPage = () => import('@/pages/NightShiftPivotPage');
// const PickingPage = () => import('@/pages/PickingPage');
// const MLPage = () => import('@/pages/MLPage');
// const PGITotal = () => import('@/pages/PGITotal');
// const PGIHourly = () => import('@/pages/PGIHourly');

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: DayShiftPivotPage,
    },
    {
      path: '/day',
      component: DayShiftPivotPage,
    },
    {
      path: '/night',
      component: NightShiftPivotPage,
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
});
