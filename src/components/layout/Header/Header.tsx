'use client'

import clsx from 'clsx'

import { CONTACTS_ID } from '@/config'

import { ArrowIcon } from '../../ui/ArrowIcon/ArrowIcon'
import { Logo } from '../../ui/Logo/Logo'

import styles from './Header.module.less'
import { useHeaderScroll } from './useHeaderScroll'

const navLinks = [
	{ href: '#about', label: 'О компании' },
	{ href: '#services', label: 'Услуги' },
	{ href: '#portfolio', label: 'Проекты' },
	{ href: '#partners', label: 'Партнёры' },
]

export const Header = () => {
	const { isDetached, isHidden, show } = useHeaderScroll()

	return (
		<header
			className={clsx(
				styles.header,
				isDetached && styles.headerDetached,
				isHidden && styles.headerHidden,
			)}
			onFocus={show}
		>
			<div className={styles.headerContainer}>
				<div className={styles.bar}>
					<Logo />
					<nav className={styles.nav}>
						{navLinks.map((link) => (
							<a className={styles.navLink} href={link.href} key={link.href}>
								{link.label}
							</a>
						))}
					</nav>
					<a className={styles.cta} href={`#${CONTACTS_ID}`}>
						Обсудить проект <ArrowIcon />
					</a>
					<a className={styles.ctaMobile} href={`#${CONTACTS_ID}`}>
						Связаться
					</a>
				</div>
			</div>
		</header>
	)
}
