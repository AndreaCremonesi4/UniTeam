<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import InfoCorsi from '../../../lib/components/corsi/InfoCorsi.svelte';
	import ReviewBox from '../../../lib/components/reviews/ReviewBox.svelte';
	import ReviewList from '../../../lib/components/reviews/ReviewList.svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
	let corso = data.corso[0];

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

		<ReviewBox on:submit={submitRating} />

		<ReviewList />
	</div>
</section>

<style>
	.container {
		flex-direction: column;
	}
</style>
