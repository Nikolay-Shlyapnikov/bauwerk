// конфиг fragma без Nx-специфики (boundaries между libs, Storybook)
import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import prettierConfig from 'eslint-config-prettier'
import perfectionist from 'eslint-plugin-perfectionist'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const sortAsc = { order: 'asc', type: 'natural' }

export default tseslint.config(
	{
		ignores: [
			'**/.next/**',
			'**/out/**',
			'**/node_modules/**',
			'**/*.tsbuildinfo',
			'**/next-env.d.ts',
		],
	},

	js.configs.recommended,

	{
		files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: { perfectionist },
		rules: {
			'perfectionist/sort-enums': ['error', sortAsc],
			'perfectionist/sort-interfaces': ['error', sortAsc],
			'perfectionist/sort-object-types': ['error', sortAsc],
			'perfectionist/sort-objects': ['error', sortAsc],
			'perfectionist/sort-union-types': ['error', sortAsc],
		},
	},

	{
		extends: [
			...tseslint.configs.recommended,
			react.configs.flat.recommended,
			react.configs.flat['jsx-runtime'],
		],
		files: ['**/*.{ts,tsx}'],
		plugins: { 'react-hooks': reactHooks },
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'react-hooks/exhaustive-deps': 'warn',
			'react-hooks/rules-of-hooks': 'error',
			'react/prop-types': 'off',
		},
		settings: {
			react: { version: '19.2' },
		},
	},

	{
		files: ['**/*.{ts,tsx}'],
		plugins: { '@next/next': nextPlugin },
		rules: {
			...nextPlugin.configs['core-web-vitals'].rules,
		},
	},

	prettierConfig,

	{
		files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
		rules: {
			curly: ['error', 'all'],
		},
	},
)
