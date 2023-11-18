<script>
	import Navbar from '../../../lib/components/navbar/Navbar.svelte';
	import InfoCorsi from '../../../lib/components/corsi/InfoCorsi.svelte';
	import ReviewBox from '../../../lib/components/reviews/ReviewBox.svelte';
	import ReviewList from '../../../lib/components/reviews/ReviewList.svelte';
	import { addRecensioneCorso } from '$lib/controller/corsi';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	let { supabase, corso, recensioni, recensioneUtente } = data;
	$: ({ supabase, corso, recensioni, recensioneUtente } = data);

	async function submitRating(event) {
		const { error } = await addRecensioneCorso(
			supabase,
			event?.detail,
			corso?.id,
			data?.session?.user?.id
		);

		if (!error) {
			invalidateAll();
		} else {
			window.alert(error);
		}
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

		{#if data.profile}
			{#key recensioneUtente}
				<ReviewBox on:submit={submitRating} data={recensioneUtente ?? {}}>
					<span slot="sottotitolo">
						Lascia una recensione per aiutare gli altri studenti ad apprendere di più sul corso
					</span>
				</ReviewBox>
			{/key}
		{:else}
			<div class="bg-dark rounded-3 text-white px-4 py-4">
				<h2 class="text-subtitle mb-0">Accedi per scrivere la tua recensione</h2>
				<p class="mb-4 opacity-75 text-body-white">
					Scrivi una recensione per aiutare gli altri studenti
				</p>
				<a href="/login?redirectTo={$page.url.pathname}"
					><button class="btn btn-secondary rounded-3 py-2 lh-lg">Accedi</button></a
				>
			</div>
		{/if}

		<ReviewList data={recensioni} valutazioneMedia={Math.round(corso.valutazione_media)} />
	</div>
</section>

<style>
	.container {
		flex-direction: column;
	}
</style>
