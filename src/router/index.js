import Vue from 'vue';
import Router from 'vue-router';
import temperatureControl from '@/components/temperatureControl';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'temperatureControl',
      component: temperatureControl,
    },
  ],
});
