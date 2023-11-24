<script>
	import TextArea from '../form/TextArea.svelte';
	import { sendMessage, getMessaggi } from '../../controller/gruppi';
	import { getInfoProfilo } from '../../controller/profilo';
	import { onMount } from 'svelte';
	import viewport from '../../controller/utilities';
	import Messaggio from './Messaggio.svelte';

	export let data;
	let containerMessaggi;
	let form;
	let inputMessaggio;
	let isLoading;

	let { supabase, session, gruppo, idIscrizioneUtente, messaggi, pageSize } = data;
	$: ({ supabase, session, gruppo, idIscrizioneUtente, messaggi, pageSize } = data);

	onMount(() => {
		// ascolta il database in attesa di nuovi messaggi
		const subscritpion = supabase
			.channel('messaggi')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'messaggi' },
				handleNewMessage
			)
			.subscribe();

		return () => {
			// non ascoltare più il database
			subscritpion.unsubscribe();
		};
	});

	async function handleNewMessage(payload) {
		const { data: profiles, error } = await getInfoProfilo(supabase, payload.new.mittente);

		if (error) {
			window.alert(error);
		} else {
			const messaggio = { ...payload.new, profiles };
			messaggi = [messaggio, ...messaggi];
		}
	}

	async function inviaMessaggio(event) {
		// verifico che il messaggio non sia vuoto
		if (!form.checkValidity() || !inputMessaggio.value.trim()) {
			inputMessaggio.setCustomValidity('Compila questo campo!');
			return form.reportValidity();
		}

		const { error } = await sendMessage(supabase, inputMessaggio.value.trim(), gruppo.id);

		if (error) {
			window.alert(error);
		} else {
			containerMessaggi.scrollTo(0, 0);
			inputMessaggio.value = '';
		}
	}

	async function caricaAltri(event) {
		if (isLoading) return;

		isLoading = true;

		const { data: altriMessaggi, error } = await getMessaggi(supabase, gruppo.id, {
			min: messaggi.length,
			max: messaggi.length + pageSize
		});

		if (error) return window.alert(error);

		if (altriMessaggi.length === 0) {
			event.target.setAttribute('style', 'display:none !important;');
		} else {
			messaggi = [...messaggi, ...altriMessaggi];
			isLoading = false;
		}
	}
</script>

<div class="row border p-3 pb-1 {idIscrizioneUtente ? 'rounded-top-3' : 'rounded-3'} ">
	<div
		bind:this={containerMessaggi}
		class="d-flex flex-column-reverse overflow-y-auto p-3"
		style="height: max(500px, 60vh);"
	>
		{#if messaggi.length > 0}
			{#each messaggi as messaggio, index (messaggio.id)}
				<Messaggio
					{messaggio}
					isMittente={session?.user && messaggio.mittente === session?.user?.id}
				/>
			{/each}

			<div class="d-flex w-100 justify-content-center" use:viewport on:enterViewport={caricaAltri}>
				<div class="spinner-border text-primary" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>
		{:else}
			<div class="h-100 d-flex justify-content-center align-items-center">
				<p class="text-subtitle fw-normal opacity-50">Ancora nessun messaggio!</p>
			</div>
		{/if}
	</div>
</div>

{#if idIscrizioneUtente || gruppo.proprietario === session?.user?.id}
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
				required={true}
				bind:input={inputMessaggio}
			/>
		</div>

		<div class="col-md-2 col-12 d-flex align-items-end">
			<button class="btn btn-secondary rounded-1 lh-1 px-4 w-100">
				<i class="bi bi-send" />
			</button>
		</div>
	</form>
{/if}
