<script setup lang="ts">
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

const {data} = await useAsyncData('mountains', () =>
	$fetch('https://api.timoanttila.com/workouts.php')
)
</script>

<template>
	<header>
		<h1>Lazy People Workouts</h1>
		<p id="description">
			Training and getting fit is hard and never seems like the right time to start. No worries.
			Quick and easy training videos help you get started.
		</p>
		<p id="videoCount">54 videos from 22 creators.</p>
	</header>

	<div v-if="Array.isArray(data) && data.length" id="videos">
		<a
			v-for="video in data"
			:key="video.id"
			:href="video.domain + video.pathWatch + video.slug"
			:title="video.creatorName + ': ' + video.name"
			:aria-label="`External link to a video on the ${video.serviceName} channel ${video.creatorName}`"
		>
			<figure>
				<nuxt-img
					:src="`https://img.youtube.com/vi/${video.slug}/mqdefault.jpg`"
					:alt="video.name"
					format="webp"
					height="180"
					width="320"
					aria-hidden="true"
					loading="lazy"
				/>
				<figcaption>
					<h2 :id="`video-${video.id}-title`" class="title">{{ video.name }}</h2>
					<h3 :id="`video-${video.id}-info`" class="info">
						{{ video.creatorName }} | {{ video.created }}
					</h3>
				</figcaption>
			</figure>
		</a>
	</div>
</template>
