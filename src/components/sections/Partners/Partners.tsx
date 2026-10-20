import styles from './Partners.module.less'

// «№ 1» — с неразрывным пробелом, чтобы номер не отрывался от названия при переносе
const partners = ['Мосинжпроект', 'Москапстрой', 'Мосотделстрой № 1', 'Монарх', 'ПИК']

export const Partners = () => (
	<section className={styles.partners} id="partners">
		<div className={styles.partnersInner}>
			<div className={styles.head}>
				<div>
					<p className={styles.eyebrow}>Нам доверяют</p>
					<h2 className={styles.title}>
						Партнёры
						<br />
						лидеров
					</h2>
				</div>
				<p className={styles.description}>
					Работаем с крупнейшими компаниями страны и разделяем высокие стандарты качества,
					прозрачности и ответственности.
				</p>
			</div>
			<div className={styles.grid}>
				{partners.map((partner) => (
					<div className={styles.partner} key={partner}>
						<span className={styles.partnerName}>{partner}</span>
					</div>
				))}
			</div>
		</div>
	</section>
)
