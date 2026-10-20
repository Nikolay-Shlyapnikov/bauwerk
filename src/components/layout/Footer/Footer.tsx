import { CONTACT_EMAIL, CONTACTS_ID } from '@/config'

import { ArrowIcon } from '../../ui/ArrowIcon/ArrowIcon'
import { Logo } from '../../ui/Logo/Logo'

import styles from './Footer.module.less'

// неразрывный пробел держит «г. Люберцы» на одной строке; в запрос к картам он уходит обычным
const addresses = [
	{ address: 'Москва, 1-й Магистральный тупик, 5А', label: 'Офис' },
	{
		address: 'Московская обл., г. Люберцы, Октябрьский проспект, 151/9',
		label: 'Юридический адрес',
	},
]

const getMapUrl = (address: string) =>
	`https://yandex.ru/maps/?text=${encodeURIComponent(address.replaceAll(' ', ' '))}`

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
					{addresses.map(({ address, label }) => (
						<p key={label}>
							<span className={styles.addressLabel}>{label}</span>
							<a
								className={styles.addressLink}
								href={getMapUrl(address)}
								rel="noopener noreferrer"
								target="_blank"
							>
								{address}
							</a>
						</p>
					))}
				</address>
				<p className={styles.copyright}>© {new Date().getFullYear()} ООО «БАУВЕРК»</p>
			</div>
		</div>
	</footer>
)
