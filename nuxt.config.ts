export default {
	target: 'static',
	ssr: true,
	modules: ['@nuxt/image-edge'],
	css: ['@/assets/global.css'],
	image: {
		domains: ['img.youtube.com']
	},
	experimental: {
		payloadExtraction: false
	},
	dayjs: {
		locales: ['fi'],
		defaultLocale: 'fi',
		defaultTimeZone: 'Helsinki/Europe'
	}
}
