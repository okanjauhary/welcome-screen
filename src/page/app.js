import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import './app.scss';

Vue.config.productionTip = false;

global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;
Vue.prototype.$isEmpty = data =>
	Boolean(data && data.constructor == Object && Object.keys(data) <= 0);
Vue.prototype.$axios = axios.create({
	headers: {
		Authorization: 'Client-ID ' + process.env.UNSPASH_ACCESS_KEY
	}
});

new Vue({
	render: h => h(App)
}).$mount('#app');
