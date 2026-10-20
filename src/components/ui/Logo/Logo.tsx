import styles from './Logo.module.less'

export const Logo = () => (
	<a aria-label="Бауверк — на главную" className={styles.logo} href="#top">
		<span className={styles.mark}>
			<span className={styles.markCell} />
			<span className={styles.markCell} />
			<span className={styles.markCell} />
			<span className={styles.markCell} />
		</span>
		<span className={styles.name}>БАУВЕРК</span>
	</a>
)
