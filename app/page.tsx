import { Footer } from '@/components/layout/Footer/Footer'
import { Header } from '@/components/layout/Header/Header'
import { About } from '@/components/sections/About/About'
import { Hero } from '@/components/sections/Hero/Hero'
import { Partners } from '@/components/sections/Partners/Partners'
import { Portfolio } from '@/components/sections/Portfolio/Portfolio'
import { Services } from '@/components/sections/Services/Services'
import { ScrollToTop } from '@/components/ui/ScrollToTop/ScrollToTop'

import styles from './page.module.less'

const HomePage = () => (
	<div className={styles.page} id="top">
		<Header />
		<main>
			<Hero />
			<About />
			<Services />
			<Portfolio />
			<Partners />
		</main>
		<Footer />
		{/* появляется, когда первый экран (Hero) пролистан и начался блок «О компании» */}
		<ScrollToTop showFromId="about" />
	</div>
)

export default HomePage
