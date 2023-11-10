<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';

	import InfoProfessore from '../../../lib/components/professori/InfoProfessore.svelte';
	import Review from '../../../lib/components/reviews/Review.svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let professore = data.professore[0];

	function submitRating(event) {
		console.log(event.detail);
	}
</script>

<Navbar {data} />

<section>
	<div class="container d-flex flex-column">
		<div class="mb-5">
			<a class="btn" href="/professori"><i class="bi bi-arrow-left" /> Professori</a>
		</div>

		<InfoProfessore {professore} class="mb-2" />

		<hr class="my-5" />

		<Review
			on:submit={submitRating}
			data={{ user: 'Pinco Pallino', rating: 3, description: 'Lorem ipsum', date: '03/12/2023' }}
		/>
	</div>
</section>
