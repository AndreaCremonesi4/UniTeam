<script>
	import Review from './Review.svelte';
	import StarRating from './StarRating.svelte';

	export let data = [
		{
			username: 'Gigetto_65',
			valutazione: 3,
			descrizione:
				'Docente disponibile e facilmente rintracciabile. Rispetta gli orari di lezione. Carico di lavoro adatto alle aspettative.',
			data_modifica: '10/11/2012'
		},
		{
			username: 'geeno_43',
			valutazione: 5,
			descrizione:
				'Docente disponibile ma difficilmente rintracciabile nel periodo delle lauree. Carico di lavoro forse un pò eccessivo.',
			data_modifica: '10/11/2012'
		},
		{
			username: 'Gigetto_65',
			valutazione: 5,
			descrizione:
				'Docente molto esperto nel campo, molto chiaro nelle spiegazioni. Carico di lavoro eccessivo.',
			data_modifica: '10/11/2012'
		}
	];
</script>

<div class="mt-5">
	<h1 class="text-title text-review text-dark mb-1">Recensione degli altri studenti</h1>
	<div class="d-flex flex-wrap mb-4 align-items-center">
		<p class="sub-header mb-0">Valutazione media:</p>
		<StarRating class="ms-2" value={3} readOnly />
	</div>

	<div class="d-flex flex-column gap-2">
		{#each data as recensione}
			<Review data={recensione} />
		{/each}
	</div>
</div>
