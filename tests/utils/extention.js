function handleReturnGet(key) {
	let getReturnValue = {};

	if (this.$get && this.$get.constructor === Object) {
		getReturnValue = { [key]: this.$get[key] };
	} else if (typeof this.$get === 'function') {
		getReturnValue = this.$get();
	}

	return Promise.resolve(getReturnValue);
}

function extention(options = {}) {
	return {
		storage: {
			local: {
				get: jest
					.fn()
					.mockImplementation(handleReturnGet.bind({ $get: options.get })),
			},
		},
	};
}

export default extention;
