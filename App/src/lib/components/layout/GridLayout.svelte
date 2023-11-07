<script>
	export let items;
	export let component;
</script>

<div class="grid gap-3 {$$props.class}">
	{#each items as item}
		<svelte:component this={component} {item} />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	@media (max-width: 1200px) {
		.grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 768px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
