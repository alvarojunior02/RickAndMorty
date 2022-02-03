module.exports = {
  	parser: "babel-eslint",
	extends: ["airbnb", "plugin:prettier/recommended", "prettier/react"],
	plugins: ["react", "prettier", "react-hooks"],
	globals: {
		__DEV__: true,
		fetch: false,
	},
	env: {
		jest: true,
	},
	rules: {
		"comma-dangle": "off",
		"react/jsx-filename-extension": [1, {extensions: [".js", ".jsx"]}],
		"import/prefer-default-export": "off",
		"react/jsx-one-expression-per-line": "off",
		"react/prop-types": ["error", {ignore: ["navigation"]}],
		"react/state-in-constructor": "off",
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		'import/order': [
			'error',
				{
					groups: ['external', ['internal', 'sibling']]
				}
		],
		"prettier/prettier": [
			"error",
			{
			  "endOfLine": "auto"
			},
		],
		strict: 0
	},
};
