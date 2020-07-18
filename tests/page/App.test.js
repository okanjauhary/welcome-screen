import { shallowMount } from '@vue/test-utils';
import App from '@/page/App.vue';
import { isEmpty } from 'Utils/vuePrototypes';
import extention from 'Utils/extention';
import flushPromises from 'Utils/promise';

describe('page/App.vue', () => {
	let mountComponent;

	beforeEach(() => {
		mountComponent = (options = {}) =>
			shallowMount(App, {
				mocks: {
					$isEmpty: isEmpty,
					...options,
				},
			});
	});

	test('Should set unsplash with existing data', async () => {
		const unsplash = 'unsplash object';
		global.browser = extention({
			get: {
				UNSPLASH_DATA: unsplash,
			},
		});

		const wrapper = mountComponent({
			mocks: {
				$isEmpty: isEmpty,
			},
		});

		await flushPromises();

		expect(wrapper.vm.unsplash).toBe(unsplash);
	});
});
