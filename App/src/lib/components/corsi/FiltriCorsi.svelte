<script>
	import { createEventDispatcher } from 'svelte';
	import GridFilters from '../layout/GridFilters.svelte';
	import SelectInput from '../form/SelectInput.svelte';
	import { getAnni, getFacolta } from '$lib/controller/corsi';

	const dispatch = createEventDispatcher();

	export let supabase;

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
		<input type="text" bind:value={inputNome} on:input={changeFilters} class="form-control" />
	</div>

	<div>
		<span>Anno</span>
		<SelectInput
			class="w-100"
			options={getAnni(supabase)}
			bind:input={inputAnno}
			onChange={changeFilters}
		/>
	</div>

	<div style="max-width: 500px">
		<span>Facoltà</span>

		<SelectInput
			class="w-100"
			options={getFacolta(supabase)}
			bind:input={inputFacolta}
			onChange={changeFilters}
		/>
	</div>
</GridFilters>
