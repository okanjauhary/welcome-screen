import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import './app.scss';

Vue.config.productionTip = false;

global.browser = require('webextension-polyfill');

Vue.prototype.$isEmpty = (data) => {
	if (typeof data === 'undefined' || data === null) {
		return true;
	} else if (typeof data === 'object' && Object.keys(data).length <= 0) {
		return true;
	} else if (Array.isArray(data) && data.length <= 0) {
		return true;
	} else {
		return false;
	}
};
Vue.prototype.$axios = axios.create({
	headers: {
		Authorization: 'Client-ID ' + process.env.UNSPASH_ACCESS_KEY,
	},
});

new Vue({
	render: (h) => h(App),
}).$mount('#app');
