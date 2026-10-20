import { CONTACT_EMAIL, CONTACTS_ID } from '@/config'

import { ArrowIcon } from '../../ui/ArrowIcon/ArrowIcon'
import { Logo } from '../../ui/Logo/Logo'

import styles from './Footer.module.less'

export const Footer = () => (
	<footer className={styles.footer} id={CONTACTS_ID}>
		<div className={styles.footerInner}>
			<div className={styles.top}>
				<div>
					<p className={styles.eyebrow}>Есть задача?</p>
					<h2 className={styles.title}>
						Давайте строить
						<br />
						вместе
					</h2>
				</div>
				<a className={styles.email} href={`mailto:${CONTACT_EMAIL}`}>
					{CONTACT_EMAIL} <ArrowIcon />
				</a>
			</div>
			<div className={styles.bottom}>
				<Logo />
				<address className={styles.addresses}>
					<p>
						<span className={styles.addressLabel}>Офис</span> Москва, 1-й Магистральный тупик, 5А
					</p>
					<p>
						<span className={styles.addressLabel}>Юридический адрес</span> Московская обл.,
						г.&nbsp;Люберцы, Октябрьский проспект, 151/9
					</p>
				</address>
				<p className={styles.copyright}>© {new Date().getFullYear()} ООО «БАУВЕРК»</p>
			</div>
		</div>
	</footer>
)
