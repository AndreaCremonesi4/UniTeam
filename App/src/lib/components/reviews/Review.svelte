<script>
	import { createEventDispatcher } from 'svelte';
	import StarRating from './StarRating.svelte';

	const dispatch = createEventDispatcher();

	export let data;

	let modifyMode = !data;
	let rating = data?.rating ?? undefined;
	let reviewDescription = data?.description ?? '';
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
	}
</script>

<div class="review-container d-flex flex-column px-md-5 px-4">
	<p class="text-title-white mt-4 mb-0">
		{modifyMode ? 'Lascia una recensione' : 'Lascia tua recensione'}
	</p>
	<p class="fw-light opacity-50 mb-4">
		{modifyMode
			? "Lascia una recensione per aiutare gli altri studenti ad apprendere di più sull'insegnante"
			: 'Visualizza e modifica la tua recensione'}
	</p>

	<form on:submit|preventDefault={submit}>
		<div
			class="text-body-white flex-sm-row flex-column stars-rate d-flex align-items-start mt-2 mb-4"
		>
			<p class="mb-0 me-2">Lascia una tua valutazione:</p>
			<StarRating
				id="sr1"
				on:change={changeRating}
				value={rating}
				required={true}
				readOnly={!modifyMode}
			/>
		</div>
		<textarea
			class="form-control fw-normal"
			rows="6"
			placeholder="Scrivi la tua recensione..."
			bind:value={reviewDescription}
			required
		/>
		<button bind:this={submitButton} class="btn btn-secondary sub-header mt-3 mb-4" type="submit"
			>Invia</button
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
