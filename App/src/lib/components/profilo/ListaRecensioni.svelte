<script>
	export let recensioni;
	export let pageSize;
	export let component;
	export let showMore = async () => {};

	export let range = {
		min: 0,
		max: pageSize - 1
	};

	$: showMoreButton = recensioni.length > range.max;

	async function mostraAltreRecensioni() {
		range.min += pageSize;
		range.max += pageSize;

		const { data: altreRecensioni } = await showMore();

		if (altreRecensioni && altreRecensioni.length > 0)
			recensioni = recensioni.concat(altreRecensioni);
	}
</script>

<div>
	{#if recensioni && recensioni.length > 0}
		<div class="row gap-3 my-4 mx-1">
			{#each recensioni as recensione}
				<svelte:component this={component} {recensione} />
			{/each}

			{#if showMoreButton}
				<div class="d-flex justify-content-center">
					<button class="btn btn-primary rounded-2 lh-1" on:click={mostraAltreRecensioni}>
						Mostra altre
					</button>
				</div>
			{/if}
		</div>
	{:else}
		<h2 class="mt-3 fw-light text-body-tertiary">Non hai scritto ancora nessuna recensione</h2>
	{/if}
</div>
