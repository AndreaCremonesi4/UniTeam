<script>
	import { createEventDispatcher } from 'svelte';
	import GridFilters from '../layout/GridFilters.svelte';
	import SelectInput from '../form/SelectInput.svelte';

	const dispatch = createEventDispatcher();

	export let data;

	let { anni, facolta } = data;
	$: ({ anni, facolta } = data);

	let inputNome = '';
	let inputAnno = '';
	let inputFacolta = '';

	function changeFilters() {
		dispatch('changeFilters', {
			inputNome,
			inputAnno,
			inputFacolta
		});
	}
</script>

<GridFilters>
	<div style="max-width:400px">
		<span>Nome / Codice</span>
		<input type="text" bind:value={inputNome} on:input={changeFilters} class="input form-control" />
	</div>

	<div>
		<span>Anno</span>
		<SelectInput class="w-100" options={anni} bind:input={inputAnno} onChange={changeFilters} />
	</div>

	<div style="max-width: 500px">
		<span>Facoltà</span>

		<SelectInput
			class="w-100"
			options={facolta}
			bind:input={inputFacolta}
			onChange={changeFilters}
		/>
	</div>
</GridFilters>
