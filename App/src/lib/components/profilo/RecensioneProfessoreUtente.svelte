<script>
	import StarRating from '../reviews/StarRating.svelte';

	export let recensione;
</script>

<a class="scheda text-black py-3" href="/professori/{recensione.id_professore}" target="_blank">
	<div class="d-flex flex-wrap mb-2 align-items-center">
		<h1 class="sub-header mb-0 me-sm-3 me-2 fw-semibold">
			{recensione.professori.nome}
		</h1>
		<p class="mb-0 lh-sm">
			{recensione.professori.struttura}
		</p>
	</div>

	<StarRating readOnly={true} value={recensione.valutazione} />
	<p>
		{recensione.descrizione}
	</p>
</a>
