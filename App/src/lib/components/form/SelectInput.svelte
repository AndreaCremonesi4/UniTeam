<script>
	export let options;
	export let input;
	export let showDefaultValue = true;
	export let onChange = () => {};
</script>

<div class="input-group has-validation {$$props.class}">
	<slot name="icon" />

	<select class="form-select {$$props.class}" bind:value={input} on:change={onChange}>
		{#if showDefaultValue}
			<slot name="default-value"><option value="">-</option></slot>
		{/if}

		{#await options then data}
			{#each data as option}
				{#if option}
					<option value={option.value}>{option.label}</option>
				{/if}
			{/each}
		{/await}
	</select>

	<div class="invalid-feedback">
		<slot name="invalid" id="invalid">Compila questo campo!</slot>
	</div>

	<slot />
</div>
