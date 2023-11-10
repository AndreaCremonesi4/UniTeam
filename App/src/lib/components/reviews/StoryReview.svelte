<script>
	import StarRating from '../../../lib/components/reviews/StarRating.svelte';
</script>

<div class="students_review-container mt-5">
	<h1 class="text-title text-review text-dark mb-1">Recensione degli altri studenti</h1>
	<div class="d-flex flex-wrap mb-4 align-items-center">
		<p class="sub-header mb-0">Valutazione media:</p>
		<StarRating class="ms-2" value={3} readOnly />
	</div>

	<div class="d-flex flex-column gap-3">
		<div class="box-review p-3">
			<div class="d-flex flex-wrap mb-4 align-items-center">
				<p class="sub-header mb-0">Gigetto_65:</p>
				<StarRating class="ms-2" value={3} readOnly />
			</div>
			<p class="text-body d-flex align-items-baseline">
				Docente disponibile e facilmente rintracciabile. Rispetta gli orari di lezione.Carico di
				lavoro adatto alle aspettative.
			</p>
			<p class="review-data text-body mt-3">10/11/2012</p>
		</div>

		<div class="box-review">
			<div class="d-flex flex-wrap mb-4 align-items-center">
				<p class="sub-header mx-2 mb-0">geeno_43:</p>
				<StarRating class="ms-2" value={5} readOnly />
			</div>
			<p class="text-body d-flex align-items-baseline m-2">
				Docente disponibile ma difficilmente rintracciabile nel periodo delle lauree. Carico di
				lavoro forse un pò eccessivo.
			</p>
			<p class="review-data text-body m-2 mt-3">10/11/2012</p>
		</div>
		<div class="box-review">
			<div class="d-flex flex-wrap mb-4 align-items-center">
				<p class="sub-header mx-2 mb-0">luca_62</p>
				<StarRating class="ms-2" value={5} readOnly />
			</div>
			<p class="text-body d-flex align-items-baseline m-2">
				Docente molto esperto nel campo, molto chiaro nelle spiegazioni. Carico di lavoro eccessivo.
			</p>
			<p class="review-data text-body m-2 mt-5">10/11/2012</p>
		</div>
	</div>
</div>

<style>
	.students_review-container {
		border-radius: 10px;
	}

	.box-review {
		border: 0.9px solid rgb(199, 200, 201);

		border-radius: 7px;
		box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
	}
</style>
