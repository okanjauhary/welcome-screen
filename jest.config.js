module.exports = {
	roots: ['<rootDir>'],
	testMatch: ['<rootDir>/tests/**/*.test.js'],
	testPathIgnorePatterns: ['<rootDir>/node_modules/*', '<rootDir>/dist/*'],
	moduleFileExtensions: ['vue', 'js', 'json'],
	collectCoverage: false,
	collectCoverageFrom: [
		'<rootDir>/src/**/*.{vue,js}',
		'!**/node_modules/**',
		'!**/dist/**',
	],
	coverageReporters: ['html', 'text-summary'],
	moduleNameMapper: {
		'@/(.*)$': '<rootDir>/src/$1',
		'Utils/(.*)$': '<rootDir>/tests/utils/$1',
	},
	transform: {
		'^.+\\.js$': 'babel-jest',
		'^.+\\.vue$': 'vue-jest',
	},
};
