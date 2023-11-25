<script>
	import { joinGruppoWithCode } from '$lib/controller/gruppi';
	import { invalidateAll, goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;

	let { supabase, session, gruppo } = data;
	$: ({ supabase, session, gruppo } = data);

	let codice_ingresso;

	async function uniscitiConCodice() {
		if (!session || !session?.user) return goto(`/login?redirectTo=${$page.url.pathname}`);

		const { error } = await joinGruppoWithCode(supabase, gruppo.id, codice_ingresso);

		if (error) window.alert(error);
		else invalidateAll();
	}
</script>

<div class="d-flex flex-column justify-content-center align-items-center">
	<h2 class="text-subtitle text-primary-emphasis mb-1">Inserisci il codice d'ingresso</h2>
	<p class="opacity-75">
		Questo gruppo è privato, inserisci il codice d'accesso per unirti. <br />Se non disponi del
		codice richiedilo al proprietario del gruppo
	</p>
	<form style="width: min(90vw, 450px);" on:submit|preventDefault={uniscitiConCodice}>
		<div class="input-group mb-3">
			<input
				type="text"
				class="form-control"
				bind:value={codice_ingresso}
				placeholder="Inserisci il codice"
				aria-label="Recipient's username"
				aria-describedby="button-addon2"
				required
			/>
			<button class="btn btn-primary py-2 rounded-end-1 px-4">
				Unisciti <i class="bi bi-box-arrow-in-right" />
			</button>
		</div>
	</form>
</div>
