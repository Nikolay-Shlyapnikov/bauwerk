// боевой домен — от него строятся абсолютные ссылки в OG-тегах, sitemap.xml и robots.txt
export const SITE_URL = 'https://bauwerk.tech'

export const CONTACT_EMAIL = 'info@bauwerk.tech'

// временная копия сайта (GitHub Pages) не должна попадать в поиск рядом с основным доменом
export const IS_PREVIEW = process.env.PREVIEW === 'true'

// блок «Давайте строить вместе» в подвале — сюда ведут все кнопки «связаться»
export const CONTACTS_ID = 'contacts'
