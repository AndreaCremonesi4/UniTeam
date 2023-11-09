<script>
	import { createEventDispatcher } from 'svelte';
	import { Rating } from 'svelte-stars-hover-rating';
	import StarRating from './StarRating.svelte';

	const dispatch = createEventDispatcher();

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

	function changeRating(event) {
		rating = event.detail.value;
		console.log(rating);
	}
</script>

<div class="review-container d-flex flex-column px-md-5 px-4">
	<p class="text-title-white mt-4 mb-0">Lascia una recensione</p>
	<p class="fw-light opacity-50 mb-4">
		Lascia una recensione per aiutare gli altri studenti ad apprendere di più sull'insegnante
	</p>
	<div
		class="text-body-white flex-sm-row flex-column stars-rate d-flex align-items-start mt-2 mb-4"
	>
		<p class="mb-0">Lascia una tua valutazione:</p>
		<StarRating class="mx-2" on:change={changeRating} />
		<StarRating class="mx-2" rating={2} readOnly />
	</div>

	<form on:submit|preventDefault={submit}>
		<textarea
			class="form-control fw-normal"
			rows="6"
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
	:global(svg) {
		cursor: pointer;
	}

	.review-container {
		color: white;
		background-color: var(--bs-primary-dark);
		border-radius: 10px;
	}

	form > button {
		width: min(300px, 100%);
		padding-top: 0.6rem;
		padding-bottom: 0.6rem;
		border-radius: 5px;
	}
</style>
