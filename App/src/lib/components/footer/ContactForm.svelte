<script>
	let messaggio;
</script>

<div class="col d-flex flex-column align-items-center text-center justify-content-center">
	<h2 class="text-title text-white">Contattaci</h2>
	<p class="text-body-white" style="font-weight: 100;">
		Hai domande o hai bisogno di assistenza?<br />
		Siamo qui per aiutarti!
	</p>
	<form class="input-container" on:submit|preventDefault>
		<input bind:value={messaggio} type="text" placeholder="Scrivici!" required />
		{#if messaggio?.trim()}
			<a
				href="mailto:uniteam.community@gmail.com?subject=Assistenza per Uniteam&body={messaggio}"
				class="btn btn-secondary sub-header"
			>
				Invia
			</a>
		{:else}
			<button class="btn btn-secondary sub-header">Invia</button>
		{/if}
	</form>
</div>

<style>
	.input-container {
		display: flex;
		background-color: white;
		border-radius: 1000px;
		overflow: hidden;
		margin-top: 1rem;
		width: min(700px, 80vw);
	}

	.input-container > input {
		outline: none;
		border: none;
		flex: 1;
		padding-left: 1rem;
		width: min(576px, 90vw);
	}

	@media (max-width: 576px) {
		.input-container {
			flex-wrap: wrap;
			overflow: visible;
			background-color: transparent;
			gap: 1rem;
			align-items: center;
			justify-content: center;
		}

		.input-container > input {
			padding: 0.8rem 2rem;
			background-color: white;
			border-radius: 1000px;
			flex: auto;
		}
	}
</style>
