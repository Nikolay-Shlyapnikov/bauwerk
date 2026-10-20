import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	// подпапка сайта: пусто для своего домена, /bauwerk — для GitHub Pages
	basePath: process.env.BASE_PATH ?? '',
	images: {
		unoptimized: true,
	},
	output: 'export',
	/* eslint-disable perfectionist/sort-objects -- порядок важен: иначе Turbopack ломает CSS Modules */
	turbopack: {
		rules: {
			'*.module.less': {
				loaders: ['less-loader'],
				as: '*.module.css',
			},
			'*.less': {
				loaders: ['less-loader'],
				as: '*.css',
			},
		},
	},
	/* eslint-enable perfectionist/sort-objects */
}

export default nextConfig
