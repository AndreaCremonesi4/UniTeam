<script>
	import InputGroup from '../form/InputGroup.svelte';
	import TextArea from '../form/TextArea.svelte';
	import { checkTextValidity } from '$lib/controller/utilities';
	import { addGruppo } from '../../controller/gruppi';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let supabase;
	export let id;

	let modal;
	let form;
	let nome;
	let descrizione;
	let privato;

	let errorNome;
	let errorDescrizione;

	let bootstrapModal;

	onMount(() => {
		bootstrapModal = new bootstrap.Modal(modal);
	});

	async function submit() {
		// verifico che il nome e la descrizione non contengano parole inappropriate
		let nomeValidity = checkTextValidity(nome.value);
		let descrizioneValidity = checkTextValidity(descrizione.value);

		if (!form.checkValidity() || !nomeValidity || !descrizioneValidity) {
			errorNome = nomeValidity === false ? 'Il nome contiene parole inappropriate' : undefined;
			errorDescrizione =
				descrizioneValidity === false ? 'La descrizione contiene parole inappropriate' : undefined;

			if (errorNome) nome.setCustomValidity(errorNome);
			if (errorDescrizione) descrizione.setCustomValidity(errorDescrizione);
		} else {
			const { error, data } = await addGruppo(supabase, nome.value, descrizione.value, privato);

			if (error) {
				window.alert(error.message);
			} else {
				bootstrapModal.hide();
				goto(`/gruppi/${data.id}`);
			}
		}

		form.classList.add('was-validated');
	}
</script>

<div
	bind:this={modal}
	{id}
	class="modal fade"
	data-bs-backdrop="static"
	data-bs-keyboard="false"
	tabindex="-1"
	aria-labelledby="staticBackdropLabel"
	aria-hidden="true"
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="staticBackdropLabel">Creazione Gruppo</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<form bind:this={form} novalidate>
					<span>Nome</span>
					<InputGroup class="mb-2" placeholder="Nome del gruppo" bind:input={nome} required>
						<span slot="invalid">{errorNome ?? 'Compila questo campo'}</span>
					</InputGroup>

					<span>Descrizione</span>
					<TextArea
						class="mb-2"
						id="descrizioneGruppo"
						placeholder="Scrivi una descrizione per questo gruppo"
						rows={5}
						bind:input={descrizione}
						required
					/>

					<span>Visibilità</span>
					<div class="form-check form-switch">
						<input
							class="form-check-input"
							type="checkbox"
							role="switch"
							id="flexSwitchCheckDefault"
							bind:checked={privato}
						/>
						<label class="form-check-label text-body-tertiary" for="flexSwitchCheckDefault">
							<i class="bi {privato ? 'bi-lock-fill' : 'bi-unlock-fill'}" />
							{privato ? 'Privato (Accesso tramite chiave)' : 'Pubblico (Accesso libero)'}
						</label>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button
					type="button"
					class="btn bg-black opacity-50 text-white rounded-1 py-2"
					data-bs-dismiss="modal">Annulla</button
				>
				<button type="button" class="btn btn-primary rounded-1 py-2" on:click={submit}>Crea</button>
			</div>
		</div>
	</div>
</div>