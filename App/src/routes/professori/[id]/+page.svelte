<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import user from '$lib/assets/icons/User.png';
	import { Rating } from 'svelte-stars-hover-rating';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
	let professore = data.professore[0];
	let rate = null;
</script>

<Navbar {data} />

<section>
	<div class="container d-flex justify-content align-items-center">
		<div class="profile d-flex gap-3">
			<div class="prof-image">
				<p>
					{#if !professore.immagine}
						<img src={user} class="icon user-avatar rounded-circle image-fluid" alt="Responsive" />
					{:else}
						<img
							src={professore.immagine}
							class="icon user-avatar rounded-circle image-fluid"
							alt="Responsive"
						/>
					{/if}
				</p>
			</div>
			<div class="prof-information d-flex flex-column">
				<p class="nome text-title text-dark">
					{professore.nome}
				</p>
				<p class="text-body text-dark">
					<span class="label text-dark">Email:</span>
					{professore.email}
				</p>
				<p class="text-body text-dark">
					<span class="label text-dark">Telefono:</span>
					{professore.telefono}
				</p>
				<p class="text-body text-dark">
					<span class="label text-dark">Ruolo:</span>
					{professore.ruolo}
				</p>
				<p class="text-body text-dark">
					<span class="label text-dark">Struttura:</span>
					{professore.struttura}
				</p>
				<p class="text-body text-dark">
					<span class="label text-dark">Pagina Ufficiale: </span>
					<a href={professore.link} class="text-primary">{professore.link}</a>
				</p>
			</div>
		</div>

		<hr class="separatore" />

		<div class="review d-flex flex-column">
			<div class="review-text">
				<p class="text-center text-title text-dark">La tua recensione</p>
				<p class="text-body">Visualizza o modifica la tua recensione</p>
			</div>
			<div class="review-rating d-flex flex-column">
				<p class="text-body rating"><Rating bind:rating={rate} /> Neutrale</p>
				<p class="text-body">Docente disponibile, ma non sempre chiaro durante le spiegazioni</p>
			</div>
		</div>
	</div>
</section>

<style>
	.container {
		flex-direction: column;
	}

	.label {
		font-weight: bold;
		color: #007bff;
		margin-right: 3px;
	}
	.text-body {
		margin-bottom: 3px;
	}
	.icon {
		width: min(100%, 200px);
	}
	.prof-information {
		flex-direction: row;
	}

	.separatore {
		width: min(90%, 70vw);
		height: 2px;
		margin: 40px;
		background-color: #ccc;
	}
	.rating {
		display: flex;
	}

	@media (max-width: 992px) {
		.profile {
			flex-direction: column;
			align-items: center;
		}
		.nome {
			text-align: center;
		}
		.prof-information {
			max-width: min(500px, 90vw);
		}
		.separatore {
			width: min(90%, 90vw);
		}
	}
	@media (max-width: 992px) {
		.text-body {
			max-width: 80%;
			height: auto;
		}
	}
	@media (max-width: 576px) {
		.text-body {
			max-width: 100%;
			height: auto;
			overflow-wrap: break-word;
		}
	}
</style>
