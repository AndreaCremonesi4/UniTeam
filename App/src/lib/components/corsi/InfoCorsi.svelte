<script>
	export let corso;
</script>

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

<style>
	.course-information {
		max-width: min(1000px, 90vw);
	}
	.label {
		font-weight: bold;
		color: #007bff;
		margin-right: 3px;
	}

	@media (max-width: 992px) {
		.text-body {
			margin-bottom: 3px;
			max-width: 100%;
			height: auto;
			overflow-wrap: break-word;
		}
	}
</style>
