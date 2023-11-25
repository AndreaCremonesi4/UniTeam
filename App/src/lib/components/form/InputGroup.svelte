<script>
	import { onMount } from 'svelte';

	export let id = '';
	export let input;
	export let value;
	export let required = true;
	export let disabled;
	export let type = 'text';
	export let placeholder;
	export let minlength;
	export let maxlength;
	export let min;
	export let max;
	export let readonly;

	onMount(() => {
		if (type === 'password' && input) {
			input.addEventListener('keypress', (event) => {
				if (event.keyCode === 32) event.preventDefault();
			});
		}
	});
</script>

<div class="input-group has-validation {$$props.class}">
	<slot name="icon" />

	<input
		{id}
		bind:this={input}
		{value}
		{type}
		class="form-control"
		{minlength}
		{maxlength}
		{min}
		{max}
		{placeholder}
		{required}
		{disabled}
		{readonly}
	/>

	<div class="invalid-feedback">
		<slot name="invalid" id="invalid">Compila questo campo!</slot>
	</div>

	<slot />
</div>

<style>
	input {
		padding: 0.65rem;
	}

	.input-group {
		padding: 0;
	}
</style>
