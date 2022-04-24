import Vue from 'vue'
import App from './App.vue'
import '@/plugins/vue-composition-api'
import router from './router'
import store from './store'
import Convert from '@/plugins/convert.js'
import vuetify from './plugins/vuetify'
import '@/assets/scss/main.scss';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Convert,
  vuetify,
  render: h => h(App)
}).$mount('#app')
