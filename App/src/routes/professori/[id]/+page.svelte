<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';

	import { Rating } from 'svelte-stars-hover-rating';
	import InfoProfessore from '../../../lib/components/professori/InfoProfessore.svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
	let professore = data.professore[0];
	let rate = null;
</script>

<Navbar {data} />

<section>
	<div class="container d-flex flex-column">
		<div class="mb-5">
			<a class="btn" href="/professori"><i class="bi bi-arrow-left" /> Professori</a>
		</div>

		<InfoProfessore {professore} class="mb-2" />

		<hr class="my-5" />

		<div class="review d-flex flex-column">
			<div class="review-text">
				<p class="text-center text-title text-dark">La tua recensione</p>
				<p class="text-body">Visualizza o modifica la tua recensione</p>
			</div>
			<div class="review-rating d-flex flex-column">
				<p class="text-body rating"><Rating bind:rating={rate} /> Neutrale</p>
				<p class="text-body">Docente disponibile, ma non sempre chiaro durante le spiegazioni</p>
			</div>
		</div>
	</div>
</section>

<style>
</style>
