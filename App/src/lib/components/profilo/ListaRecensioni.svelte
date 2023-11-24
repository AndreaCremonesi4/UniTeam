<script>
	import CaricaAltro from '../utilities/CaricaAltro.svelte';

	export let recensioni;
	export let component;
	export let showMore = async () => {};
</script>

<div>
	{#if recensioni && recensioni.length > 0}
		<div class="row gap-3 my-4 mx-1">
			{#each recensioni as recensione}
				<svelte:component this={component} {recensione} />
			{/each}

			<CaricaAltro caricaAltro={showMore} />
		</div>
	{:else}
		<h2 class="mt-3 fw-light text-body-tertiary">Non hai scritto ancora nessuna recensione</h2>
	{/if}
</div>
