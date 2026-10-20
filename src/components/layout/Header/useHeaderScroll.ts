import { useCallback, useEffect, useRef, useState } from 'react'

import { getClampedScrollY } from '@/utils/scroll'

// после стольких пикселей шапка «отрывается» от страницы и становится плавающей панелью
const DETACH_OFFSET = 24
// выше этой отметки шапка не прячется — у самого верха она всегда видна
const HIDE_OFFSET = 160
// прячется не сразу, а после стольких пикселей непрерывного скролла вниз —
// случайная короткая прокрутка шапку не уносит
const HIDE_DISTANCE = 200
// а выезжает почти сразу: если человек потянул вверх, шапка, скорее всего, нужна.
// Порог больше нуля, чтобы не реагировать на подёргивания тачпада и инерцию
const SHOW_DISTANCE = 8

export const useHeaderScroll = () => {
	const [isDetached, setIsDetached] = useState(false)
	const [isHidden, setIsHidden] = useState(false)
	// копия isHidden для обработчика скролла — он создаётся один раз и state не видит
	const isHiddenRef = useRef(false)

	const setHidden = useCallback((value: boolean) => {
		isHiddenRef.current = value
		setIsHidden(value)
	}, [])

	useEffect(() => {
		// точка, откуда считаем пройденное расстояние: она «едет» за скроллом, пока он идёт
		// в ту же сторону, что и текущее состояние, и замирает, когда направление сменилось
		let anchorY = getClampedScrollY()
		let frame = 0

		const update = () => {
			frame = 0
			const y = getClampedScrollY()
			setIsDetached(y > DETACH_OFFSET)

			if (y <= HIDE_OFFSET) {
				setHidden(false)
				anchorY = y
				return
			}

			if (isHiddenRef.current) {
				if (y > anchorY) {
					anchorY = y
				} else if (anchorY - y >= SHOW_DISTANCE) {
					setHidden(false)
					anchorY = y
				}
			} else if (y < anchorY) {
				anchorY = y
			} else if (y - anchorY >= HIDE_DISTANCE) {
				setHidden(true)
				anchorY = y
			}
		}

		// не чаще одного пересчёта за кадр
		const handleScroll = () => {
			if (!frame) {
				frame = requestAnimationFrame(update)
			}
		}

		update()
		window.addEventListener('scroll', handleScroll, { passive: true })

		return () => {
			window.removeEventListener('scroll', handleScroll)
			cancelAnimationFrame(frame)
		}
	}, [setHidden])

	return { isDetached, isHidden, show: () => setHidden(false) }
}
