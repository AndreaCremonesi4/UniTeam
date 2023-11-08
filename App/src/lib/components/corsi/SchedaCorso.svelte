<script>
	export let item;
</script>

<a class="px-3 scheda text-black" href="/corso/{item.id}">
	<p class="mb-0 mt-3"><em>{item.codice}</em></p>
	<h1 class="mb-3 sub-header fw-semibold">
		{item.nome} ({item.crediti} CFU)
	</h1>
	<p class="mb-3">
		{item.anno_full} - {item.facolta}
	</p>
</a>

<style>
	.scheda {
		border: 1px solid #c5c5c5;
		border-radius: 7px;
		text-decoration: none;

		transition: box-shadow 250ms ease-out, background-color 250ms ease-out;

		text-wrap: balance;
	}

	.scheda:hover {
		background-color: rgba(0, 33, 85, 0.1);
		box-shadow: 0px 0px 10px rgba(0, 33, 85, 0.5);
	}
</style>
