<script>
	import { createEventDispatcher } from 'svelte';
	import GridFilters from '../layout/GridFilters.svelte';
	import SelectInput from '../form/SelectInput.svelte';

	const dispatch = createEventDispatcher();

	export let data;

	let { ruoli, strutture } = data;
	$: ({ ruoli, strutture } = data);

	let inputNome = '';
	let inputRuolo = '';
	let inputStruttura = '';

	function changeFilters() {
		dispatch('changeFilters', {
			inputNome,
			inputRuolo,
			inputStruttura
		});
	}
</script>

<GridFilters>
	<div style="max-width:400px">
		<span>Nome</span>
		<input type="text" bind:value={inputNome} on:input={changeFilters} class="input form-control" />
	</div>

	<div>
		<span>Ruolo</span>
		<SelectInput class="w-100" options={ruoli} bind:input={inputRuolo} onChange={changeFilters} />
	</div>

	<div style="max-width: 500px">
		<span>Struttura</span>

		<SelectInput
			class="w-100"
			options={strutture}
			bind:input={inputStruttura}
			onChange={changeFilters}
		/>
	</div>
</GridFilters>
