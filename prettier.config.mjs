/** @type {import("prettier").Config} */
const config = {
	trailingComma: "all",
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: false,
	jsxSingleQuote: false,
	arrowParens: "avoid",
	importOrder: [
		"<THIRD_PARTY_MODULES>",
		"^@/app/(.*)$",
		"^@/components/(.*)$",
		"^@/graphql/(.*)$",
		"^@/hooks/(.*)$",
		"^@/libs/(.*)$",
		"^@/providers/(.*)$",
		"^@/schemas/(.*)$",
		"^@/store/(.*)$",
		"^@/styles/(.*)$",
		"^@/utils/(.*)$",
		"^../(.*)$",
		"^./(.*)$",
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	importOrderCaseInsensitive: true,
	importOrderParserPlugins: ["typescript", "jsx"],
	tailwindStylesheet: "./src/app/globals.css",
	plugins: [
		"@trivago/prettier-plugin-sort-imports",
		"prettier-plugin-tailwindcss",
	],
};

export default config;
