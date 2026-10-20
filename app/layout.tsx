import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import type { ReactNode } from 'react'

import { IS_PREVIEW, SITE_URL } from '@/config'

import './globals.less'

// next/font скачивает шрифт при сборке и раздаёт его с нашего домена — без запросов к Google
const manrope = Manrope({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-manrope',
	weight: ['400', '500', '600', '700', '800'],
})

const title = 'Бауверк — цифровое строительство'
const description =
	'Строительная компания с самым высоким уровнем цифровизации процессов в России: генеральный подряд, промышленное строительство, BIM и технический заказчик.'

export const metadata: Metadata = {
	appleWebApp: { title: 'Бауверк' },
	description,
	metadataBase: new URL(SITE_URL),
	openGraph: {
		description,
		locale: 'ru_RU',
		siteName: 'Бауверк',
		title,
		type: 'website',
	},
	robots: IS_PREVIEW ? { follow: false, index: false } : undefined,
	title,
}

export const viewport: Viewport = {
	themeColor: '#0f172a',
}

const RootLayout = ({ children }: { children: ReactNode }) => (
	<html className={manrope.variable} data-scroll-behavior="smooth" lang="ru">
		<body>{children}</body>
	</html>
)

export default RootLayout
