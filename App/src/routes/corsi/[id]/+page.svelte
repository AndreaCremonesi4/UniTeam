<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { Rating } from 'svelte-stars-hover-rating';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let corso = data.corso[0];
	let rate = null;
</script>

<Navbar {data} />

<section>
	<div class="container d-flex justify-content">
		<div class="mb-5">
			<a class="btn" href="/corsi"><i class="bi bi-arrow-left" /> Corsi</a>
		</div>
		<div class="course-text">
			<div class="course-title">
				<p class="name text-title">{corso.nome}</p>
			</div>
			<div class="course-information">
				<p class="text-body text-dark">
					<span class="label text-dark">Codice:</span>
					{corso.codice}
				</p>
				<p class="text-body text-dark">
					<span class="label text-dark">Anno:</span>
					{corso.anno}
				</p>
				<p class="text-body text-dark">
					<span class="label text-dark">Facoltà:</span>
					{corso.facolta}
				</p>
				<p class="text-body text-dark gap-5">
					{@html corso.descrizione}
				</p>
			</div>
		</div>
		<hr class="separatore" />
		<div class="course-review">
			<p class="text-body rating"><Rating bind:rating={rate} /> Neutrale</p>
		</div>
		<div class="other-review">
			<!--inserire review di altri studenti-->
		</div>
	</div>
</section>

<style>
	.container {
		flex-direction: column;
	}
	.course-information {
		max-width: min(1000px, 90vw);
	}
	.label {
		font-weight: bold;
		color: #007bff;
		margin-right: 3px;
	}
	.separatore {
		width: min(90%, 70vw);
		height: 2px;
		margin: 40px;
		background-color: #ccc;
	}
	@media (max-width: 992px) {
		.separatore {
			width: min(90%, 90vw);
		}
		.text-body {
			margin-bottom: 3px;
			max-width: 100%;
			height: auto;
			overflow-wrap: break-word;
		}
	}
</style>
