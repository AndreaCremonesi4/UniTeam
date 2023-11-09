<script>
	import { createEventDispatcher } from 'svelte';
	import { Rating } from 'svelte-stars-hover-rating';

	const dispatch = createEventDispatcher();

	const rates = [
		'Molto insoddisfatto',
		'Insoddisfatto',
		'Neutrale',
		'Soddisfatto',
		'Molto soddisfatto'
	];

	let rating;
	let reviewDescription = '';
	let submitButton;

	$: submitButton != undefined
		? (submitButton.disabled = !rating || reviewDescription.trim().length === 0)
		: null;

	function submit() {
		dispatch('submit', {
			rating,
			reviewDescription
		});
	}
</script>

<div class="review-container d-flex flex-column px-2">
	<p class="text-title-white mx-4 mt-4 mb-1">Lascia una recensione</p>
	<p class="text-body-white mx-4 mb-5">
		Lascia una recensione per aiutare gli altri studenti ad apprendere di più sull'insegnante
	</p>
	<p class="text-body-white stars-rate d-flex align-items-baseline mx-4">
		Lascia una tua valutazione: <Rating bind:rating />
		{#if rating}
			{rates[rating - 1]}
		{/if}
	</p>

	<form on:submit|preventDefault={submit}>
		<textarea
			class="form-control fw-normal"
			id="comment"
			name="comment"
			rows="7"
			placeholder="Scrivi la tua recensione..."
			bind:value={reviewDescription}
			required
		/>
		<button
			bind:this={submitButton}
			disabled
			class="btn btn-secondary sub-header mt-3 mb-4"
			type="submit">Invia</button
		>
	</form>
</div>

<style>
	.review-container {
		color: white;
		background-color: var(--bs-primary-dark);
		border-radius: 10px;
	}

	form {
		padding: 0 1rem;
		text-align: left;
		border-radius: 5px;
	}

	form > button {
		width: min(300px, 100%);
		padding-top: 0.6rem;
		padding-bottom: 0.6rem;
		border-radius: 5px;
	}

	@media (max-width: 454px) {
		.stars-rate {
			flex-direction: column;
		}
	}
</style>
