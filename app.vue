<script setup>
import dayjs from 'dayjs'

const title = 'Lazy People Workouts'
const description =
	'Training and getting fit is hard and never seems like the right time to start. No worries. Quick and easy training videos help you get started.'
const canonical = 'https://lazypeopleworkouts.com/'
const image = 'https://lazypeopleworkouts.sportti.org/familyworkout.jpg'
const created = '2022-07-20T05:16:23Z'
const updated = '2023-03-25T12:00:00+02:00'
const themeColor = '#422e43'

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
		{property: 'canonical', content: canonical},
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
		{rel: 'icon', type: 'image/x-icon', href: canonical + 'favicon.ico'},
		{rel: 'me', type: 'application/atom+xml', href: 'https://api.timoanttila.com/workouts-rss.php'}
	]
})

const pageNumber = useState('page', () => 1)
const limit = 15

const {data, pending, refresh} = await useAsyncData('videos', () =>
	$fetch(`https://api.timoanttila.com/workouts.php?limit=${limit}&page=${pageNumber.value}`)
)

const loadMore = value => {
	useState('page', () => value)
	refresh()
}
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

				<div id="pageButtons">
					<button @click="() => loadMore(pageNumber--)" :disabled="pageNumber <= 1">
						<svg
							clip-rule="evenodd"
							fill-rule="evenodd"
							stroke-linejoin="round"
							stroke-miterlimit="2"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							title="Previous page"
							aria-label="Videos on the previous page"
							aria-controls="videos pageCount"
						>
							<path
								d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z"
							/>
						</svg>
					</button>
					<button
						@click="() => loadMore(pageNumber++)"
						:disabled="pageNumber >= data.pages"
						title="Previous page"
						aria-label="Videos on the next page"
						aria-controls="videos pageCount"
					>
						<svg
							clip-rule="evenodd"
							fill-rule="evenodd"
							stroke-linejoin="round"
							stroke-miterlimit="2"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"
							/>
						</svg>
					</button>
				</div>
			</template>
		</header>

		<div
			v-if="!pending && Array.isArray(data.videos) && data.videos.length"
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
	</div>
</template>
