<script setup>
import dayjs from 'dayjs'

const domain = 'https://lazypeopleworkouts.com',
	created = '2022-07-20T05:16:23Z',
	description =
		'Training and getting fit is hard and never seems like the right time to start. No worries. Quick and easy training videos help you get started.',
	image = domain + '/familyworkout.jpg',
	limit = 15,
	themeColor = '#422e43',
	title = 'Lazy People Workouts',
	updated = '2023-05-01T10:40:00+02:00'

useHead({
	title,
	htmlAttrs: {
		lang: 'en'
	},
	meta: [
		{charset: 'utf-8'},
		{name: 'viewport', content: 'width=device-width, initial-scale=1'},
		{name: 'format-detection', content: 'telephone=no'},
		{name: 'twitter:creator', content: '@_timoanttila'},
		{name: 'apple-mobile-web-app-capable', content: 'yes'},
		{property: 'og:type', content: 'website'},
		{property: 'og:locale', content: 'en_US'},
		{property: 'og:site_name', content: title},
		{property: 'og:title', name: 'twitter:title', content: title},
		{hid: 'home', name: 'description', property: 'og:description', content: description},
		{property: 'og:image', content: image, name: 'twitter:image'},
		{property: 'og:image:secure_url', content: image},
		{property: 'og:image:width', content: '1200'},
		{property: 'og:image:height', content: '630'},
		{property: 'og:pubdate', name: 'pubdate', content: created},
		{property: 'article:published_time', content: created},
		{property: 'article:modified_time', name: 'revised', content: updated},
		{'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
		{name: 'msapplication-TileColor', content: themeColor},
		{name: 'msapplication-TileImage', content: themeColor},
		{name: 'theme-color', content: themeColor}
	],
	link: [
		{rel: 'dns-prefetch', href: 'https://img.youtube.com'},
		{rel: 'icon', type: 'image/x-icon', href: domain + '/favicon.ico'},
		{rel: 'me', type: 'application/atom+xml', href: 'https://api.timoanttila.com/workouts-rss.php'}
	]
})

const route = useRoute()
const pageNumber = useState('page', () => route.query.page || 1)

const {data, pending, refresh} = await useAsyncData('videos', () =>
	$fetch(`https://api.timoanttila.com/workouts.php?limit=${limit}&page=${pageNumber.value}`)
)

watch(
	route,
	to => {
		if (to.query.page !== pageNumber.value) {
			pageNumber.value = to.query.page || 1
			refresh()
		}
	},
	{flush: 'pre', immediate: true, deep: true}
)
</script>

<template>
	<div id="workoutVideos">
		<header>
			<h1>Lazy People Workouts</h1>
			<p id="description">
				Training and getting fit is hard and never seems like the right time to start. No worries.
				Quick and easy training videos help you get started.
			</p>

			<template v-if="data && data.total">
				<div id="videoCount">{{ data.total }} videos from {{ data.creators }} creators.</div>
				<div id="pageCount" aria-live="polite">Page {{ data.page }} / {{ data.pages }}</div>

				<PageNumber :max="data.pages" />
			</template>
		</header>

		<div
			v-if="!pending && data && Array.isArray(data.videos) && data.videos.length"
			id="videos"
			aria-live="polite"
		>
			<a
				v-for="(video, index) of data.videos"
				:key="video.id"
				:href="video.domain + video.pathWatch + video.slug"
				:title="video.creatorName + ': ' + video.name"
				:aria-label="`External link to a video on the ${video.serviceName} channel ${video.creatorName}`"
			>
				<figure>
					<img
						:src="`https://img.youtube.com/vi_webp/${video.slug}/mqdefault.webp`"
						:alt="video.name"
						height="180"
						width="320"
						aria-hidden="true"
						:loading="index > 3 ? 'lazy' : 'eager'"
					/>
					<figcaption>
						<h2 :id="`video-${video.id}-title`" class="title">{{ video.name }}</h2>
						<h3 :id="`video-${video.id}-info`" class="info">
							{{ video.creatorName }} | {{ dayjs(video.created).format('DD.MM.YYYY') }}
						</h3>
					</figcaption>
				</figure>
			</a>
		</div>

		<PageNumber v-if="data && data.total" :max="data.pages" class="mb-10" />
	</div>
</template>
