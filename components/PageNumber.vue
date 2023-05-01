<script setup>
const props = defineProps({
	max: {
		type: Number,
		required: true
	}
})

const pageNumber = useState('page')

const loadMore = type => {
	const oldValue = pageNumber.value ? Number(pageNumber.value) : 1
	const newValue = type === 1 ? oldValue - 1 : oldValue + 1
	pageNumber.value = newValue
	const router = useRouter()

	router.push(
		newValue > 1
			? {
					path: '/',
					query: {page: newValue}
			  }
			: '/'
	)
}
</script>

<template>
	<div class="pageButtons">
		<button
			@click="() => loadMore(1)"
			:disabled="pageNumber <= 1"
			rel="prev"
			title="Previous page"
			aria-label="Videos on the previous page"
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
				<title>Arrow left</title>
				<path
					d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z"
				/>
			</svg>
		</button>

		<button
			@click="() => loadMore(2)"
			:disabled="pageNumber >= max"
			rel="next"
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
				<title>Arrow right</title>
				<path
					d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"
				/>
			</svg>
		</button>
	</div>
</template>
