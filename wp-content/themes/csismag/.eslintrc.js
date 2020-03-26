module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: [
		// 'eslint:recommended',
		'plugin:@wordpress/eslint-plugin/recommended',
		'prettier',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		sourceType: 'module',
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: 'never',
		'no-console': 0,
		'no-debugger': 'warn',
		'no-var': 'warn',
		'require-jsdoc': 'off',
		'prettier/prettier': 'error',
	},
}
