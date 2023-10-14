<script>
	import { onMount } from "svelte";

	export let input;
	export let required = true;
	export let disabled;
	export let type = 'text';
	export let placeholder;
	export let minlength;
    export let maxlength;
    export let min;
    export let max;

	onMount(() => {
		if(type === 'password' && input){
			input.addEventListener('keypress', event => {
				if(event.keyCode === 32)
					event.preventDefault();
			})
		}
	})
</script>

<div class="input-group has-validation {$$props.class}">
	<slot name="icon" />

	<input
		bind:this={input}
		{type}
		class="form-control"
		{minlength}
        {maxlength}
        {min}
        {max}
		{placeholder}
		{required}
		{disabled}
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
