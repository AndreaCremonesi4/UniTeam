<script>
	import { sendMessage } from '../../controller/gruppi';
	import { checkTextValidity } from '$lib/controller/utilities';
	import TextArea from '../form/TextArea.svelte';

	export let data;
	export let onSend;

	let form;
	let inputMessaggio;
	let fileInput;
	let files;
	let isSending;

	let { supabase, session, gruppo } = data;
	$: ({ supabase, session, gruppo } = data);

	async function inviaMessaggio(event) {
		// verifico che almeno il messaggio o il file allegato non sia vuoto
		if (isSending || (!inputMessaggio.value.trim() && fileInput.files.length <= 0)) return;

		isSending = true;

		try {
			let messaggioValidity = checkTextValidity(inputMessaggio.value.trim());

			if (!messaggioValidity)
				return window.alert('Il messaggio contiene delle parole inappropriate!');

			const { error } = await sendMessage(
				supabase,
				inputMessaggio.value.trim(),
				fileInput?.files[0],
				gruppo,
				session?.user?.id
			);

			if (error) {
				window.alert(error.message);
			} else {
				inputMessaggio.value = '';
				onSend();
				resetFileInput();
			}
		} catch (ex) {
			window.alert(ex);
		} finally {
			isSending = false;
		}
	}

	function openUpload() {
		fileInput.click();
	}

	function resetFileInput() {
		fileInput.value = '';
	}
</script>

{#if files && files[0]}
	<div class="row d-flex align-items-center">
		<div class="col-sm-11 col-10 overflow-x-hidden" style="white-space: nowrap;">
			{files[0].name}
		</div>
		<div class="col-sm-1 col-2 px-0">
			{#if !isSending}
				<button button class="btn" on:click={resetFileInput}><i class="bi bi-x fs-5" /></button>
			{:else}
				<div class="spinner-border spinner-border-sm my-2" role="status">
					<span class="visually-hidden">Caricamento...</span>
				</div>
			{/if}
		</div>
	</div>
{/if}

<form
	bind:this={form}
	on:submit|preventDefault={inviaMessaggio}
	class="row bg-dark px-md-5 px-2 py-4 gap-md-0 gap-2 rounded-bottom-1"
>
	<div class="col-md-10 col-12">
		<TextArea
			rows={4}
			placeholder="Invia un messaggio..."
			resizable={false}
			bind:input={inputMessaggio}
		/>
	</div>

	<div class="col-md-2 col-12 gap-md-0 gap-2 d-flex flex-column justify-content-between">
		<div>
			<input type="file" hidden bind:this={fileInput} bind:files />
			<button
				class="d-flex w-100 justify-content-center btn btn-primary rounded-1 lh-base px-4 py-1"
				on:click|preventDefault={openUpload}
				disabled={isSending}
			>
				<i class="bi bi-paperclip fs-4" />
			</button>
		</div>

		<button class="btn btn-secondary rounded-1 lh-1 px-4 w-100" disabled={isSending}>
			{#if isSending}
				<div class="spinner-border spinner-border-sm" role="status">
					<span class="visually-hidden">Caricamento...</span>
				</div>
			{:else}
				<i class="bi bi-send" />
			{/if}
		</button>
	</div>
</form>
