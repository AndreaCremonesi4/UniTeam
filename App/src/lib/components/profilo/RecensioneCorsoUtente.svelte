<script>
	import StarRating from '../reviews/StarRating.svelte';

	export let recensione;
</script>

<a class="scheda text-black py-3" href="/corsi/{recensione.id_corso}" target="_blank">
	<div class="d-flex flex-wrap mb-2 align-items-center">
		<p class="mb-0 me-sm-3 me-2 text-black-50"><em>{recensione.corsi.codice}</em></p>
		<h1 class="mb-0 me-sm-3 me-2 sub-header fw-semibold">
			{recensione.corsi.nome} ({recensione.corsi.crediti} CFU)
		</h1>
		<p class="mb-0">
			{recensione.corsi.anno_full} - {recensione.corsi.facolta}
		</p>
	</div>

	<StarRating readOnly={true} value={recensione.valutazione} />
	<p>
		{recensione.descrizione}
	</p>
</a>
