'use client'

import clsx from 'clsx'
import { useId, useState } from 'react'

import { ArrowIcon } from '../../ui/ArrowIcon/ArrowIcon'

import styles from './Services.module.less'

export type Service = {
	details: string
	number: string
	text: string
	title: string
}

// одновременно раскрыта только одна карточка: клик по другой закрывает предыдущую
export const ServicesAccordion = ({ services }: { services: Service[] }) => {
	const [openNumber, setOpenNumber] = useState<null | string>(null)
	const id = useId()

	const toggle = (number: string) => {
		setOpenNumber((current) => (current === number ? null : number))
	}

	return (
		<div className={styles.grid}>
			{services.map((service) => {
				const isOpen = openNumber === service.number
				const panelId = `${id}-${service.number}`

				return (
					<article className={clsx(styles.card, isOpen && styles.cardOpen)} key={service.number}>
						<div className={styles.cardMain}>
							<span className={styles.cardNumber}>{service.number}</span>
							<h3 className={styles.cardTitle}>
								<button
									aria-controls={panelId}
									aria-expanded={isOpen}
									className={styles.cardToggle}
									onClick={() => toggle(service.number)}
									type="button"
								>
									{service.title}
								</button>
							</h3>
							<div className={styles.cardFooter}>
								<p className={styles.cardText}>{service.text}</p>
								<span className={styles.cardArrow}>
									<ArrowIcon />
								</span>
							</div>
						</div>
						{/* inert убирает свёрнутый текст из таб-навигации и дерева доступности */}
						<div className={styles.cardDetails} id={panelId} inert={!isOpen}>
							<div className={styles.cardDetailsInner}>
								<p className={styles.cardDetailsText}>{service.details}</p>
							</div>
						</div>
					</article>
				)
			})}
		</div>
	)
}
