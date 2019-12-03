import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Games from '../views/Games/Games.vue';
import Game from '../views/Game/Game.vue';
import HalfPredict from '../views/HalfPredict/HalfPredict.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/games',
    name: 'games',
    component: Games,
  },
  {
    path: '/game/:game_id',
    name: 'game',
    component: Game,
  },
  {
    path: '/half_predict',
    name: 'half_predict',
    component: HalfPredict,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
