<template>
	<div class="app-body">
		<h1 class="center">INI DIBUAT MENGGUNAKAN VUE JS</h1>
	</div>
</template>
<script>
export default {
	name: 'App',

	data() {
		return {
			unsplash: {},
		};
	},

	async mounted() {
		await this.initBackgroundPage();
		this.changeBackgroundApp(this.unsplash);
	},

	methods: {
		async initBackgroundPage() {
			const [{ UNSPLASH_DATA }, { UNSPASH_LAST_UPDATE }] = await Promise.all([
				this.$browser.storage.local.get('UNSPLASH_DATA'),
				this.$browser.storage.local.get('UNSPASH_LAST_UPDATE'),
			]);

			if (
				this.$isEmpty(UNSPLASH_DATA) ||
				this.needUpdateCurrentImage(UNSPASH_LAST_UPDATE)
			) {
				const result = await this.getRandomImages({
					orientation: 'landscape',
					collections: process.env.UNSPASH_COLLECTION_ID,
				});

				if (result.success) {
					this.unsplash = result.data;
					await this.$browser.storage.local.set({
						UNSPLASH_DATA: result.data,
					});
				}
			} else {
				this.unsplash = UNSPLASH_DATA;
			}
		},

		needUpdateCurrentImage(lastUpdateDate) {
			return false;
		},

		async getRandomImages(params) {
			const result = { success: false, data: {} };
			try {
				const response = await this.$axios.get(
					'https://api.unsplash.com/photos/random',
					{
						params,
					}
				);

				result.success = true;
				result.data = response.data;
			} catch (error) {
				result.data = error;
			}

			return result;
		},

		changeBackgroundApp(unsplash) {
			const { urls, color } = unsplash;

			if (urls) {
				document.body.style.cssText = `
          background-color: ${color || 'whitesmoke'};
          background-image: url(${urls.regular});
        `;
			}
		},
	},
};
</script>
<style scoped lang="scss">
.center {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: #fff;
}
</style>
