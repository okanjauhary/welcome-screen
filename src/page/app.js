import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

global.browser = require("webextension-polyfill");
Vue.prototype.$browser = global.browser;

new Vue({
  render: h => h(App)
}).$mount("#app");
