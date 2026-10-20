import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

// пути относительные — от адреса манифеста, поэтому работают и в корне домена, и в подпапке GitHub Pages
const manifest = (): MetadataRoute.Manifest => ({
	background_color: '#0f172a',
	display: 'browser',
	icons: [
		{ sizes: '192x192', src: 'icons/icon-192.png', type: 'image/png' },
		{ sizes: '512x512', src: 'icons/icon-512.png', type: 'image/png' },
		{
			purpose: 'maskable',
			sizes: '512x512',
			src: 'icons/icon-maskable-512.png',
			type: 'image/png',
		},
	],
	lang: 'ru',
	name: 'Бауверк',
	short_name: 'Бауверк',
	start_url: './',
	theme_color: '#0f172a',
})

export default manifest
