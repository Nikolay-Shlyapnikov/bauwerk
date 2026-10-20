import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
