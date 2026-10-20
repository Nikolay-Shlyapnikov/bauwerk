import styles from './About.module.less'

export const About = () => (
	<section className={styles.about} id="about">
		<div className={styles.aboutInner}>
			<div>
				<p className={styles.eyebrow}>О компании</p>
				<p className={styles.company}>ООО «БАУВЕРК»</p>
			</div>
			<div>
				<h2 className={styles.title}>
					Управляем сложностью. <span className={styles.titleMuted}>Создаём результат.</span>
				</h2>
				<div className={styles.cards}>
					<p className={styles.card}>
						Объединяем инженерную экспертизу, данные и современные технологии, чтобы строить
						быстрее, точнее и безопаснее.
					</p>
					<p className={styles.card}>
						Каждый участник проекта видит актуальную картину: от модели объекта и бюджета до
						прогресса работ на площадке.
					</p>
				</div>
			</div>
		</div>
	</section>
)
