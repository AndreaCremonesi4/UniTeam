<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import user from '$lib/assets/icons/User.png';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
</script>

<Navbar {data} />

<section>
	<div class="container">
		{#each data.professori as professore (professore.id)}
			<div class="professore-container d-flex flex-row align-items-center">
				<div class="image mt-2">
					{#if professore.immagine == null}
						<img src={user} class="icon user-avatar rounded-circle image-fluid" alt=" " />
					{:else}
						<img
							src={professore.immagine}
							class="icon user-avatar rounded-circle image-fluid"
							alt=" "
						/>
					{/if}
				</div>
				<div class="prof data">
					<p>{professore.email}</p>
					<p>{professore.nome}</p>
					<p>{professore.ruolo}</p>
					<p>{professore.telefono}</p>
					<p>
						Pagina Ufficiale: <a href={professore.link} class="text-primary">{professore.link}</a>
					</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.icon {
		width: min(120px, 90vw);
	}
</style>
