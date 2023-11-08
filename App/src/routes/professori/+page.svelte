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
			<a href="/professori/{professore.id}">
				<div class="professore d-flex flex-row align-items-center">
					<div class="image mt-2">
						{#if !professore.immagine}
							<img src={user} class="icon user-avatar rounded-circle image-fluid" alt=" " />
						{:else}
							<img
								src={professore.immagine}
								class="icon user-avatar rounded-circle image-fluid"
								alt=" "
							/>
						{/if}
					</div>
					<div class="prof-data text-body mt-5">
						<p>{professore.email}</p>
						<p>{professore.nome}</p>
						<p>{professore.ruolo}</p>
						<p>{professore.telefono}</p>
						<p>
							Pagina Ufficiale: <a href={professore.link} class="text-primary">{professore.link}</a>
						</p>
					</div>
				</div>
			</a>
		{/each}
	</div>
</section>

<style>
	.professore {
		display: flex;
		flex-direction: row;
		transition: background-color 0.3s ease;
		border: 1px solid #ccc;
		align-items: center;
		margin-bottom: 10px;
		max-width: 800px;
		max-height: 250px;
	}
	.prof-data {
		margin-left: auto;
		max-width: 400px;
	}
	.text-body {
		text-decoration: none;
	}
	.professore:hover {
		background-color: #f2f2f2;
		cursor: pointer;
	}
	.icon {
		width: min(120px, 90vw);
		transform: translateX(20px);
	}
</style>
