<script>
	export let item;
</script>

<a class="px-3 scheda text-black" href="/corso/{item.id}">
	<p class="mb-0 mt-3 text-black-50"><em>{item.codice}</em></p>
	<h1 class="mb-3 sub-header fw-semibold">
		{item.nome} ({item.crediti} CFU)
	</h1>
	<p class="mb-3">
		{item.anno_full} - {item.facolta}
	</p>
</a>
