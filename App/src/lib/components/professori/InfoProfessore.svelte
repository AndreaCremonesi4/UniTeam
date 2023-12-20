<script>
	import userIcon from '$lib/assets/icons/User.png';

	export let professore;
</script>

<div class="row profile {$$props.class}">
	<div class="col-lg-3 col-md-12 d-flex justify-content-center align-items-center">
		<div
			class="rounded-circle d-flex align-items-center overflow-hidden"
			style="aspect-ratio: 1; max-width: 175px;"
		>
			<img
				class="object-fit-cover rounded-circle"
				style="max-width: 100%; aspect-ratio:1"
				src={professore.immagine ?? userIcon}
				alt=""
			/>
		</div>
	</div>
	<div class="info-col col-lg-9 col-md-12 d-flex flex-column">
		<h1 class="name text-title lh-1 mb-3 text-dark">
			{professore.nome}
		</h1>
		<div class="prof-info">
			{#if professore.email}
				<p class="text-body">
					<span class="label">Email:</span>
					<a class="text-break" href="mailto:{professore.email}">{professore.email} </a>
				</p>
			{/if}
			{#if professore.telefono}
				<p class="text-body">
					<span class="label">Telefono:</span>
					{professore.telefono}
				</p>
			{/if}
			{#if professore.ruolo}
				<p class="text-body">
					<span class="label">Ruolo:</span>
					{professore.ruolo}
				</p>
			{/if}
			{#if professore.struttura}
				<p class="text-body">
					<span class="label">Struttura:</span>
					{professore.struttura}
				</p>
			{/if}
			{#if professore.link}
				<p class="text-body">
					<span class="label">Pagina Ufficiale: </span>
					<a class="text-break" href={professore.link}>{professore.link}</a>
				</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.label {
		font-weight: 700;
		color: var(--bs-primary-dark);
	}

	.text-body {
		margin-bottom: 0px;
		font-weight: 400;
	}

	.icon {
		width: min(200px, 100%);
	}

	@media (max-width: 992px) {
		.info-col {
			align-items: center;
			margin-top: 1rem;
		}

		.nome {
			text-align: center;
		}

		.prof-info {
			max-width: min(400px, 90vw);
		}
	}
</style>
