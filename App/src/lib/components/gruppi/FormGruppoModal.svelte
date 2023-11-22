<script>
	import InputGroup from '../form/InputGroup.svelte';
	import TextArea from '../form/TextArea.svelte';
	import { checkTextValidity } from '$lib/controller/utilities';
	import { addGruppo } from '../../controller/gruppi';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import ConfirmModal from '../modal/ConfirmModal.svelte';

	export let id;
	export let supabase;

	let modal;
	let form;
	let nome;
	let descrizione;
	let privato;

	let errorNome;
	let errorDescrizione;

	onMount(() => {
		nome.addEventListener('input', (event) => {
			nome.setCustomValidity(nome.value.trim() === '' ? 'Nome vuoto' : '');
		});

		descrizione.addEventListener('input', (event) => {
			descrizione.setCustomValidity(descrizione.value.trim() === '' ? 'Descrizione vuota' : '');
		});
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
			const { error, data } = await addGruppo(
				supabase,
				nome.value.trim(),
				descrizione.value.trim(),
				privato
			);

			if (error) {
				window.alert(error.message);
			} else {
				modal.hide();
				goto(`/gruppi/${data.id}`);
			}
		}

		form.classList.add('was-validated');
	}
</script>

<ConfirmModal bind:modal {id} onConfirm={submit}>
	<span slot="title">Creazione Gruppo</span>

	<form slot="body" bind:this={form} novalidate>
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

	<span slot="confirm-text">Crea</span>
</ConfirmModal>
