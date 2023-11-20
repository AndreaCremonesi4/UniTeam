<script>
	import { createEventDispatcher } from 'svelte';
	import GridFilters from '../layout/GridFilters.svelte';
	import SelectInput from '../form/SelectInput.svelte';

	const dispatch = createEventDispatcher();

	let inputNome = '';
	let inputVisibilita;

	function changeFilters() {
		dispatch('changeFilters', {
			inputNome,
			inputVisibilita
		});
	}
</script>

<GridFilters>
	<div style="max-width:400px">
		<span>Nome</span>
		<input type="text" bind:value={inputNome} on:input={changeFilters} class="form-control" />
	</div>

	<div>
		<span>Visibilità</span>
		<SelectInput
			class="w-100"
			options={[
				{ label: '-', value: undefined },
				{ label: 'Pubblico', value: false },
				{ label: 'Privato', value: true }
			]}
			showDefaultValue={false}
			bind:input={inputVisibilita}
			onChange={changeFilters}
		/>
	</div>
</GridFilters>
