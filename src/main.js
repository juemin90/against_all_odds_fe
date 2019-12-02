import Vue from 'vue';
import ViewUI from 'view-design';
import App from './containers/App.vue';
import router from './router';
import store from './store/index';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
