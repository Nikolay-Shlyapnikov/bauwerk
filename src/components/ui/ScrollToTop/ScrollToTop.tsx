'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { getClampedScrollY, getMaxScrollY } from '@/utils/scroll'

import styles from './ScrollToTop.module.less'

type ScrollToTopProps = {
	// кнопка появляется, когда верх этой секции доехал до верха экрана
	showFromId: string
}

// круглая кнопка в углу: по кольцу и числу видно, сколько страницы прочитано,
// при наведении число сменяется стрелкой, по клику — плавно наверх
export const ScrollToTop = ({ showFromId }: ScrollToTopProps) => {
	const [isVisible, setIsVisible] = useState(false)
	const [percent, setPercent] = useState(0)

	useEffect(() => {
		let frame = 0

		const update = () => {
			frame = 0
			const y = getClampedScrollY()
			const scrollable = getMaxScrollY()
			const showFrom = document.getElementById(showFromId)?.offsetTop ?? window.innerHeight

			setIsVisible(y >= showFrom)
			setPercent(scrollable > 0 ? Math.round((y / scrollable) * 100) : 0)
		}

		const handleChange = () => {
			if (!frame) {
				frame = requestAnimationFrame(update)
			}
		}

		update()
		window.addEventListener('scroll', handleChange, { passive: true })
		// высота страницы меняется при повороте экрана и раскрытии аккордеона
		window.addEventListener('resize', handleChange)

		return () => {
			window.removeEventListener('scroll', handleChange)
			window.removeEventListener('resize', handleChange)
			cancelAnimationFrame(frame)
		}
	}, [showFromId])

	const scrollToTop = () => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		window.scrollTo({ behavior: prefersReducedMotion ? 'auto' : 'smooth', top: 0 })
	}

	return (
		<button
			aria-label={`Наверх, прочитано ${percent}%`}
			className={clsx(styles.button, isVisible && styles.buttonVisible)}
			// пока кнопка спрятана, её не должно быть ни для мыши, ни для Tab, ни для скринридера
			inert={!isVisible}
			onClick={scrollToTop}
			title="Наверх"
			type="button"
		>
			{/* pathLength=100 — длина окружности ровно 100 единиц, процент подставляется напрямую */}
			<svg aria-hidden="true" className={styles.ring} viewBox="0 0 52 52">
				<circle className={styles.ringTrack} cx="26" cy="26" pathLength={100} r="24" />
				<circle
					className={styles.ringProgress}
					cx="26"
					cy="26"
					pathLength={100}
					r="24"
					strokeDashoffset={100 - percent}
				/>
			</svg>
			<span aria-hidden="true" className={styles.percent}>
				{percent}%
			</span>
			<svg aria-hidden="true" className={styles.arrow} viewBox="0 0 24 24">
				<path d="M12 19V5M6 11l6-6 6 6" />
			</svg>
		</button>
	)
}
