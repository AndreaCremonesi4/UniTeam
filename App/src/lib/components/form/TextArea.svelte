<script>
	export let id;
	export let rows;
	export let cols;
	export let placeholder;
	export let input;
	export let value;
	export let required;
	export let resizable = true;
</script>

<div class="input-group has-validation {$$props.class}">
	<slot name="icon" />

	<textarea
		class="form-control fw-normal {resizable === false ? 'not-resizable' : ''}"
		{id}
		{rows}
		{cols}
		{placeholder}
		bind:value
		bind:this={input}
		{required}
	/>

	<div class="invalid-feedback">
		<slot name="invalid" id="invalid">Compila questo campo!</slot>
	</div>

	<slot />
</div>

<style>
	.not-resizable {
		resize: none;
	}
</style>
