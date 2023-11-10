<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { Rating } from 'svelte-stars-hover-rating';
	import InfoCorsi from '../../../lib/components/corsi/InfoCorsi.svelte';
	import Review from '../../../lib/components/reviews/Review.svelte';
	import StoryReview from '../../../lib/components/reviews/StoryReview.svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
	let corso = data.corso[0];
	let rate = null;

	function submitRating(event) {
		console.log(event.detail);
	}
</script>

<Navbar {data} />

<section>
	<div class="container d-flex justify-content">
		<div class="mb-5">
			<a class="btn" href="/corsi"><i class="bi bi-arrow-left" /> Corsi</a>
		</div>

		<InfoCorsi {corso} />

		<hr class="my-5" />

		<Review on:submit={submitRating} />

		<StoryReview />
	</div>
</section>

<style>
	.container {
		flex-direction: column;
	}
</style>
