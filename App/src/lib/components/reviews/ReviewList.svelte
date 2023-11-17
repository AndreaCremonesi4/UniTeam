<script>
	import Review from './Review.svelte';
	import StarRating from './StarRating.svelte';

	export let valutazioneMedia;
	export let data;
</script>

<div class="mt-5">
	<h1 class="text-title text-review text-dark mb-1">Recensioni degli studenti</h1>
	{#if data && data.length > 0}
		{#if valutazioneMedia}
			<div class="d-flex flex-wrap mb-4 align-items-center">
				<p class="sub-header mb-0">Valutazione media:</p>
				<StarRating class="ms-2" value={valutazioneMedia} readOnly />
			</div>
		{/if}

		<div class="d-flex flex-column gap-2">
			{#each data as recensione}
				<Review data={recensione} />
			{/each}
		</div>
	{:else}
		<h2 class="text-title fw-normal opacity-75">Ancora nessuna recensione. Dai la tua opinione!</h2>
	{/if}
</div>
