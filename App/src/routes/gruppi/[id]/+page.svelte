<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import { joinGruppo, leaveGruppo, joinGruppoWithCode } from '$lib/controller/gruppi';
	import { invalidateAll } from '$app/navigation';
	import Modal from '../../../lib/components/modal/Modal.svelte';
	import InfoIscrittoGruppo from '../../../lib/components/gruppi/InfoIscrittoGruppo.svelte';

	export let data;

	let codice_ingresso;

	let { supabase, session, gruppo, iscritti, idIscrizioneUtente } = data;
	$: ({ supabase, session, gruppo, iscritti, idIscrizioneUtente } = data);

	async function unisciti() {
		const { error } = await joinGruppo(supabase, gruppo.id);

		if (error) window.alert(error);
		else invalidateAll();
	}

	async function uniscitiConCodice() {
		const { error } = await joinGruppoWithCode(supabase, gruppo.id, codice_ingresso);

		if (error) window.alert(error);
		else invalidateAll();
	}

	async function abbandona() {
		const { error } = await leaveGruppo(supabase, idIscrizioneUtente);

		if (error) window.alert(error);
		else invalidateAll();
	}
</script>

<Navbar {data} />

<section>
	<div class="container d-flex flex-column">
		<div class="mb-5">
			<a class="btn" href="/gruppi"><i class="bi bi-arrow-left" /> Gruppi</a>
		</div>

		{#if session?.user?.id !== gruppo.proprietario && gruppo.privato && !idIscrizioneUtente}
			<div class="d-flex flex-column justify-content-center align-items-center">
				<h2 class="text-subtitle text-primary-emphasis mb-1">Inserisci il codice d'ingresso</h2>
				<p class="opacity-75">
					Questo gruppo è privato, inserisci il codice d'accesso per unirti. <br />Se non disponi
					del codice richiedilo al proprietario del gruppo
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
		{:else}
			<div class="col">
				<div class="d-flex justify-content-center mb-3">
					<i
						class="bi {gruppo.privato
							? 'bi-lock-fill'
							: 'bi-unlock-fill'} text-body-tertiary me-2 fs-2"
					/>
					<h1 class="text-title text-primary-emphasis mb-0">{gruppo.nome}</h1>
				</div>

				{#if session?.user && gruppo.proprietario === session.user.id}
					{#if gruppo.privato}
						<div class="d-flex justify-content-center">
							<p>Codice ingresso: {gruppo.codice_ingresso}</p>
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

			<button class="btn" data-bs-toggle="modal" data-bs-target="#iscrittiModal">
				<i class="bi bi-people-fill" />
			</button>

			<Modal id="iscrittiModal">
				<span slot="title">Iscritti</span>

				<div slot="body">
					<InfoIscrittoGruppo {session} profilo={gruppo.profiles} {gruppo} />
					{#each iscritti as iscritto}
						<InfoIscrittoGruppo {session} profilo={iscritto.profiles} {gruppo} />
					{/each}
				</div>
			</Modal>
		{/if}
	</div>
</section>

<Footer />
