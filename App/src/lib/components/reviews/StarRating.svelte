<script>
	import { createEventDispatcher } from 'svelte';

	export let showLabel = true;
	export let rating;
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

	function changeRating(value) {
		rating = value;
		dispatch('change', {
			value
		});
	}
</script>

<div class="d-flex flex-wrap">
	<div class="rating {$$props.class}">
		{#each Array(nStars) as _, i}
			{#if !readOnly}
				<input
					type="radio"
					name="rating"
					value={nStars - i}
					id={nStars - i}
					{required}
					on:click={() => {
						changeRating(nStars - i);
					}}
				/><label for={nStars - i}>&#9734;</label>
			{:else}
				<span style="color: {nStars - i <= rating ? '#ffd700' : 'white'};"
					>{nStars - i <= rating ? '★' : '☆'}</span
				>
			{/if}
		{/each}
	</div>
	<div>
		{#if showLabel && rating}
			<em class="opacity-50">{rates[rating - 1]}</em>
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
		color: white;
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
