<script>
	import SchedaGruppo from '../gruppi/SchedaGruppo.svelte';
	import CaricaAltro from '../utilities/CaricaAltro.svelte';

	export let gruppi;
	export let caricaAltro = () => {};
</script>

<div>
	{#if gruppi && gruppi.length > 0}
		<div class="row gap-3 my-4 mx-1">
			{#each gruppi as gruppo}
				<SchedaGruppo item={gruppo} openInNewPage={true} />
			{/each}

			<CaricaAltro {caricaAltro} />
		</div>
	{:else}
		<h2 class="mt-3 fw-light text-body-tertiary">
			<slot name="noResults">Non sei iscritto a nessun gruppo</slot>
		</h2>
	{/if}
</div>
