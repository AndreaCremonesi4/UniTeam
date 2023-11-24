<script>
	import { joinGruppo, leaveGruppo } from '$lib/controller/gruppi';
	import { invalidateAll, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session, gruppo, idIscrizioneUtente } = data;
	$: ({ supabase, session, gruppo, idIscrizioneUtente } = data);

	let codeCopied;

	async function unisciti() {
		if (!session || !session?.user) return goto(`/login?redirectTo=${$page.url.pathname}`);

		const { error } = await joinGruppo(supabase, gruppo.id);

		if (error) window.alert(error);
		else invalidateAll();
	}

	async function abbandona() {
		const { error } = await leaveGruppo(supabase, idIscrizioneUtente);

		if (error) window.alert(error);
		else invalidateAll();
	}

	function copiaCodice() {
		navigator.clipboard.writeText(gruppo.codice_ingresso);

		codeCopied = true;
	}
</script>

<div class="col">
	<div class="d-flex flex-column align-items-center mb-3 text-center">
		<div class="d-flex">
			<i
				class="bi {gruppo.privato ? 'bi-lock-fill' : 'bi-unlock-fill'} text-body-tertiary me-2 fs-2"
			/>
			<h1 class="text-title text-primary-emphasis mb-0">{gruppo.nome}</h1>
		</div>
		<p class="opacity-75">{gruppo.descrizione}</p>
	</div>

	{#if session?.user && gruppo.proprietario === session.user.id}
		{#if gruppo.privato}
			<div class="d-flex justify-content-center">
				<p id="codice-ingresso" class="mb-0">Codice ingresso: {gruppo.codice_ingresso}</p>
				<button
					class="btn py-0 lh-base"
					title={codeCopied ? 'Codice copiato!' : 'Copia il codice'}
					on:click={copiaCodice}
					><i class="bi {codeCopied ? 'bi-clipboard-check' : 'bi-clipboard-fill'}" /></button
				>
			</div>
		{/if}
	{:else}
		<div class="d-flex justify-content-center">
			{#if !idIscrizioneUtente}
				<button class="btn btn-secondary rounded-1 lh-1 px-4" on:click={unisciti}>
					Unisciti <i class="bi bi-box-arrow-in-right" />
				</button>
			{:else}
				<button class="btn btn-primary rounded-1 lh-1 py-3 px-4" on:click={abbandona}>
					Abbandona <i class="bi bi-box-arrow-in-left" />
				</button>
			{/if}
		</div>
	{/if}
</div>
