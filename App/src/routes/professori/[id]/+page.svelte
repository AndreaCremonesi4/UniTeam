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
				<p class="nome main-header text-dark">
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

		<div class="recensione d-flex flex-column">
			<p class=" main-header text-dark">La tua recensione</p>
			<p class="text-body">Visualizza o modifica la tua recensione</p>

			<Rating bind:rating={rate} />
			<p class="text-body">Neutrale</p>
			<p class="text-body">Docente disponibile, ma non sempre chiaro durante le spiegazioni</p>
		</div>
	</div>
</section>

<style>
	.container {
		width: 1015px;
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
		width: min(100%, 70vw);
		height: 2px;
		margin: 30px auto;
		background-color: #ccc;
	}
	.recensione {
		margin-top: 50px;
		margin-left: 50px;
	}

	@media (max-width: 992px) {
		.text-body {
			max-width: 80%;
		}

		.profile {
			flex-direction: column;
			align-items: center;
		}
		.prof-information {
			max-width: min(500px, 90vw);
		}
	}
	@media (max-width: 768px) {
		.profile {
			width: 100%;
		}
	}
	@media (max-width: 576px) {
		.profile {
			width: 80%;
		}
	}
</style>
