import de from './locales/de.json'
import en from './locales/en.json'

export default {
    locale: 'de',
    fallbackLocale: 'en',
    messages: { de, en },
    dateTimeFormats: {
        de: {
            short: {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }
        }
    }
}
