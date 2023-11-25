<script>
	import { createEventDispatcher } from 'svelte';
	import StarRating from './StarRating.svelte';
	import TextArea from '../form/TextArea.svelte';

	const dispatch = createEventDispatcher();

	export let data = {};
	export let isLoading;

	let modifyMode = data ? Object.keys(data).length === 0 : false;
	let form;

	function submit() {
		if (!form.checkValidity()) return;

		data.data_modifica = new Date();

		dispatch('submit', data);
	}

	function changeRating(event) {
		data.valutazione = event.detail.value;
	}
</script>

<div class="review-container d-flex flex-column px-md-5 px-4">
	<p class="text-title-white mt-4 mb-0">
		{modifyMode ? 'Lascia una recensione' : 'La tua recensione'}
	</p>

	<p class="fw-light opacity-50 mb-4">
		{#if modifyMode}
			<slot name="sottotitolo">Lascia una recensione per aiutare gli altri studenti</slot>
		{:else}
			Visualizza e modifica la tua recensione
		{/if}
	</p>

	<form bind:this={form} on:submit|preventDefault={submit}>
		<div
			class="text-body-white flex-sm-row flex-column stars-rate d-flex align-items-start mt-2 mb-4"
		>
			<p class="mb-0 me-2">
				{modifyMode ? 'Lascia una tua valutazione: ' : 'La tua valutazione: '}
			</p>
			{#if modifyMode}
				<StarRating id="sr1" on:change={changeRating} value={data.valutazione} required={true} />
			{:else}
				<StarRating value={data.valutazione} readOnly={true} />
			{/if}
		</div>

		{#if modifyMode}
			<TextArea
				bind:value={data.descrizione}
				rows={6}
				placeholder="Scrivi la tua recensione..."
				required
			/>

			<button class="btn btn-secondary sub-header mt-3 mb-4" type="submit" disabled={isLoading}>
				{#if isLoading}
					<div class="spinner-border spinner-border-sm" role="status">
						<span class="visually-hidden">Caricamento...</span>
					</div>
				{:else}
					Invia
				{/if}
			</button>
		{:else}
			<p>{data.descrizione}</p>
			<p><em class="fw-lighter">{new Date(data.data_modifica).toLocaleDateString()}</em></p>
			<button
				class="btn btn-secondary sub-header mt-3 mb-4"
				type="button"
				on:click={(e) => {
					e.preventDefault();
					modifyMode = true;
				}}>Modifica</button
			>
		{/if}
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
