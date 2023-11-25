<script>
	import ReviewCard from './ReviewCard.svelte';

	import corsi from '$lib/assets/icons/corsi.png';
	import professori from '$lib/assets/icons/teacher.png';
</script>

<section class="container">
	<div class="col d-flex flex-column justify-content-center align-items-center text-center">
		<div class="row mb-5 pb-5">
			<h2 id="review-title" class="text-title text-dark">Recensioni</h2>
			<p id="review-body" class="text-body">
				Hai mai desiderato un luogo dove poter condividere le tue esperienze sugli insegnanti e i<br
				/>corsi universitari? UniTeam è qui per te! Scrivi recensioni dettagliate sui corsi e i<br
				/>professori per aiutare i tuoi compagni di corso a prendere decisioni informate.
			</p>
		</div>

		<div class="row gap-5 d-flex justify-content-center">
			<ReviewCard
				title="Corsi"
				description="Leggi le recensioni scritte dagli studenti stessi e scopri quali corsi si adattano meglio ai tuoi interessi e obiettivi accademici"
				icon={corsi}
				href="/corsi"
			/>
			<ReviewCard
				title="Professori"
				description="Le valutazioni degli studenti forniscono un'importante prospettiva sugli insegnanti, aiutandoti a trovare docenti che si adattano al tuo stile di apprendimento e alle tue esigenze"
				icon={professori}
				href="/professori"
			/>
		</div>
	</div>
</section>

<style>
	.container {
		width: min(800px, 100%);
	}
</style>
