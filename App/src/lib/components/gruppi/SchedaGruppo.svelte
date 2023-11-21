<script>
	export let item;
</script>

<a class="px-3 scheda text-black d-flex" href="/gruppi/{item.id}">
	<div class="col py-3">
		<h1 class="mb-1 sub-header fw-semibold">
			<i class="bi {item.privato ? 'bi-lock-fill' : 'bi-unlock-fill'} text-body-tertiary" />
			{item.nome}
		</h1>
		{#if item.descrizione}
			<p class="mb-0 clamp-3">
				{item.descrizione}
			</p>
		{/if}
	</div>
</a>

<style>
	.clamp-3 {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
	}
</style>
