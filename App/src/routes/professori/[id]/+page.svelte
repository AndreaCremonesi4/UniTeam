<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import InfoProfessore from '../../../lib/components/professori/InfoProfessore.svelte';
	import ReviewBox from '../../../lib/components/reviews/ReviewBox.svelte';
	import ReviewList from '../../../lib/components/reviews/ReviewList.svelte';
	import { addRecensioneProfessore } from '$lib/controller/professori';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	let { supabase, professore, recensioni, recensioneUtente } = data;
	$: ({ supabase, professore, recensioni, recensioneUtente } = data);

	async function submitRating(event) {
		const { error } = await addRecensioneProfessore(
			supabase,
			event?.detail,
			professore?.id,
			data?.session?.user?.id
		);

		if (!error) invalidateAll();
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

		{#if data.profile}
			<ReviewBox on:submit={submitRating} data={recensioneUtente ?? {}}>
				<span slot="sottotitolo">
					Lascia una recensione per aiutare gli altri studenti ad apprendere di più sul professore
				</span>
			</ReviewBox>
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

		<ReviewList data={recensioni} valutazioneMedia={Math.round(professore.valutazione_media)} />
	</div>
</section>
