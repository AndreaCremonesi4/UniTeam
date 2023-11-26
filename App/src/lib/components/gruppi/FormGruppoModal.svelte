<script>
	import InputGroup from '../form/InputGroup.svelte';
	import TextArea from '../form/TextArea.svelte';
	import { checkTextValidity } from '$lib/controller/utilities';
	import { upsertGruppo } from '../../controller/gruppi';
	import { goto, invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import ConfirmModal from '../modal/ConfirmModal.svelte';

	export let id;
	export let supabase;
	export let gruppo = {};

	let modal;
	let form;
	let nome;
	let descrizione;

	let errorNome;
	let errorDescrizione;
	let isLoading;

	onMount(() => {
		nome.addEventListener('input', (event) => {
			nome.setCustomValidity(nome.value.trim() === '' ? 'Nome vuoto' : '');
		});

		descrizione.addEventListener('input', (event) => {
			descrizione.setCustomValidity(descrizione.value.trim() === '' ? 'Descrizione vuota' : '');
		});
	});

	async function submit() {
		isLoading = true;
		try {
			await creaGruppo();
		} catch (ex) {
			window.alert(ex);
		} finally {
			isLoading = false;
		}
	}

	async function creaGruppo() {
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
			const { error, data } = await upsertGruppo(
				supabase,
				gruppo?.id,
				nome.value.trim(),
				descrizione.value.trim(),
				gruppo?.privato ?? false
			);

			if (error) {
				window.alert(error.message);
			} else {
				modal.hide();
				await goto(`/gruppi/${data.id}`);
				await invalidateAll();
			}
		}

		form?.classList?.add('was-validated');
	}
</script>

<ConfirmModal bind:modal {id} onConfirm={submit} disabled={isLoading}>
	<span slot="title"><slot name="title">Creazione Gruppo</slot></span>

	<form slot="body" bind:this={form} novalidate>
		<span>Nome</span>
		<InputGroup
			class="mb-2"
			placeholder="Nome del gruppo"
			bind:input={nome}
			value={gruppo?.nome ?? ''}
			required
		>
			<span slot="invalid">{errorNome ?? 'Compila questo campo'}</span>
		</InputGroup>

		<span>Descrizione</span>
		<TextArea
			class="mb-2"
			id="descrizioneGruppo"
			placeholder="Scrivi una descrizione per questo gruppo"
			rows={5}
			bind:input={descrizione}
			bind:value={gruppo.descrizione}
			required
		/>

		<span>Visibilità</span>
		<div class="form-check form-switch">
			<input
				class="form-check-input"
				type="checkbox"
				role="switch"
				id="flexSwitchCheckDefault"
				bind:checked={gruppo.privato}
			/>
			<label class="form-check-label text-body-tertiary" for="flexSwitchCheckDefault">
				<i class="bi {gruppo.privato ? 'bi-lock-fill' : 'bi-unlock-fill'}" />
				{gruppo.privato ? 'Privato (Accesso tramite chiave)' : 'Pubblico (Accesso libero)'}
			</label>
		</div>
	</form>

	<span slot="confirm-text"><slot name="confirm-text">Crea</slot></span>
</ConfirmModal>
