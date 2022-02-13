import Vue from 'vue'
import App from './App.vue'
import iView from 'iview';
import moment from 'moment'
//引用router.js
import router from './router/index'

import 'iview/dist/styles/iview.css'; // 使用 CSS

import 'lib-flexible'

Vue.prototype.$moment = moment;
Vue.config.productionTip = false;
Vue.use(iView);

Vue.filter('conversionDate', function (time) {
  if (time === '' || !time){
    return '——'
  }else{
    return moment(time).format('YYYY-MM-DD');
  }
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
