import clsx from 'clsx'
import Image from 'next/image'

import { CONTACTS_ID } from '@/config'

import { ArrowIcon } from '../../ui/ArrowIcon/ArrowIcon'

import styles from './Portfolio.module.less'

const projects = [
	{
		area: '22 300 м²',
		image:
			'https://images.unsplash.com/photo-1786282820056-6a073a261a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400',
		location: 'Люберцы, Московская обл.',
		title: 'Школа на 1 500 мест',
		year: '2025',
	},
	{
		area: '15 600 м²',
		image:
			'https://images.unsplash.com/photo-1758611228434-7b5b697abd0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400',
		location: 'Москва, Рязанский проспект',
		title: 'Образовательный центр',
		year: '2024',
	},
	{
		area: '19 800 м²',
		image:
			'https://images.unsplash.com/photo-1778751225720-ee0f1d2ad14e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400',
		location: 'Москва, Выхино-Жулебино',
		title: 'Школа нового поколения',
		year: '2024',
	},
	{
		area: '17 200 м²',
		image:
			'https://images.unsplash.com/photo-1786013522160-00ac876da3ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400',
		location: 'Москва, Измайлово',
		title: 'Школа с детским садом',
		year: '2023',
	},
]

export const Portfolio = () => (
	<section className={styles.portfolio} id="portfolio">
		<div className={styles.portfolioInner}>
			<div className={styles.head}>
				<div>
					<p className={styles.eyebrow}>Портфолио</p>
					<h2 className={styles.title}>
						Строим школы
						<span className={styles.titleMuted}>для Москвы</span>
					</h2>
				</div>
				<p className={styles.description}>
					Школы и образовательные центры на юго-востоке Москвы и в Подмосковье, где архитектура,
					безопасность и цифровая инфраструктура работают как единая система.
				</p>
			</div>

			<div className={styles.grid}>
				{projects.map((project, index) => (
					<article
						className={clsx(styles.card, (index === 0 || index === 3) && styles.cardTall)}
						key={project.title}
					>
						<Image
							alt={`${project.title}, ${project.location}`}
							className={styles.cardImage}
							fill
							sizes="(min-width: 768px) 50vw, 100vw"
							src={project.image}
						/>
						<div className={styles.cardShade} />
						<div className={styles.cardBody}>
							<div className={styles.cardMeta}>
								<span>{project.location}</span>
								<span className={styles.cardYear}>{project.year}</span>
							</div>
							<div className={styles.cardFooter}>
								<h3 className={styles.cardTitle}>{project.title}</h3>
								<span className={styles.cardArea}>{project.area}</span>
							</div>
						</div>
					</article>
				))}
			</div>

			<div className={styles.cta}>
				<p className={styles.ctaText}>
					Каждый объект проектируется в BIM и сопровождается цифровым контролем качества на всех
					этапах строительства.
				</p>
				<a className={styles.ctaButton} href={`#${CONTACTS_ID}`}>
					Получить портфолио <ArrowIcon />
				</a>
			</div>
		</div>
	</section>
)
