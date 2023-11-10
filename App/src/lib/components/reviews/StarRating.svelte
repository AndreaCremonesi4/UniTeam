<script>
	import { createEventDispatcher, onMount } from 'svelte';

	export let id;
	export let showLabel = true;
	export let value;
	export let readOnly;
	export let required;

	const rates = [
		'Molto insoddisfatto',
		'Insoddisfatto',
		'Neutrale',
		'Soddisfatto',
		'Molto soddisfatto'
	];

	const nStars = rates.length;

	const dispatch = createEventDispatcher();

	function changeRating(newValue) {
		value = newValue;
		dispatch('change', {
			value
		});
	}

	onMount(() => {
		if (value) {
			const stars = document.getElementsByTagName('input');
			stars[5 - value].checked = true;
		}
	});
</script>

<div class="d-flex flex-wrap">
	<fieldset class="rating {$$props.class}">
		{#each Array(nStars) as _, i}
			{#if !readOnly}
				<input
					type="radio"
					name={id}
					value={nStars - i}
					id={id + (nStars - i)}
					{required}
					on:click={() => {
						changeRating(nStars - i);
					}}
				/><label for={id + (nStars - i)}>★</label>
			{:else}
				<span style="color: {nStars - i <= value ? '#ffd700' : `#fafafa`};">★</span>
			{/if}
		{/each}
	</fieldset>
	<div class="d-flex align-items-center">
		{#if showLabel && value}
			<em class="opacity-50">{rates[value - 1]}</em>
		{/if}
	</div>
</div>

<style>
	.rating {
		display: flex;
		flex-direction: row-reverse;
		align-items: start;
		position: relative;
	}

	.rating > input {
		opacity: 0;
		left: 43%;
		position: absolute;
		pointer-events: none;
	}

	.rating > label,
	.rating > span {
		position: relative;
		width: 1.5rem;
		font-size: 1.5rem;
		user-select: none;
	}

	.rating > label {
		cursor: pointer;
	}

	.rating > label::before {
		content: '\2605';
		position: absolute;
		opacity: 0;
		color: #ffd700;
	}

	.rating > label:hover:before,
	.rating > label:hover ~ label:before {
		opacity: 1 !important;
	}

	.rating > input:checked ~ label:before {
		opacity: 1;
	}

	.rating:hover > input:checked ~ label:before {
		opacity: 0.4;
	}
</style>
