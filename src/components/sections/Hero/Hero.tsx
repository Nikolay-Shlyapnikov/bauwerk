import Image from 'next/image'

import styles from './Hero.module.less'

const stats = [
	{ label: 'лет на рынке', value: '17+' },
	{ label: 'объектов реализовано', value: '240' },
	{ label: 'процессов в цифре', value: '100%' },
]

export const Hero = () => (
	<section className={styles.hero}>
		<Image
			alt="Башенный кран на современной строительной площадке"
			className={styles.image}
			fill
			priority
			sizes="100vw"
			src="https://images.unsplash.com/photo-1692166623396-1a44298e22fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=2000"
		/>
		<div className={styles.shadeSide} />
		<div className={styles.shadeBottom} />

		<div className={styles.heroInner}>
			<div className={styles.content}>
				<div className={styles.eyebrow}>
					<span className={styles.eyebrowLine} />
					Строим будущее сегодня
				</div>
				<h1 className={styles.title}>
					Технологии
					<span className={styles.titleAccent}>в основе</span>
					строительства
				</h1>
				<p className={styles.lead}>
					Строительная компания с самым высоким уровнем цифровизации процессов в России.
				</p>
			</div>

			<div className={styles.stats}>
				{stats.map((stat) => (
					<div className={styles.stat} key={stat.label}>
						<strong className={styles.statValue}>{stat.value}</strong>
						<span className={styles.statLabel}>{stat.label}</span>
					</div>
				))}
			</div>
		</div>
	</section>
)
