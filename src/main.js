import Vue from 'vue';
import ViewUI from 'view-design';
import echarts from 'echarts';
import axios from 'axios';
import App from './containers/App.vue';
import router from './router';
import store from './store/index';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost:8080';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
