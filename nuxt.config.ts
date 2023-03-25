export default {
	target: 'static',
	ssr: true,
	css: ['@/assets/global.css'],
	experimental: {
		payloadExtraction: false
	},
	dayjs: {
		locales: ['fi'],
		defaultLocale: 'fi',
		defaultTimeZone: 'Helsinki/Europe'
	}
}
