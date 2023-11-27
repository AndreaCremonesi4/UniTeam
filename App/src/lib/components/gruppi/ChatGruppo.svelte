<script>
	import { getMessaggi, listenChannelMessaggi } from '../../controller/gruppi';
	import { getInfoProfilo } from '../../controller/profilo';
	import { onMount } from 'svelte';
	import Messaggio from './Messaggio.svelte';
	import CaricaAltro from '../utilities/CaricaAltro.svelte';
	import BoxMessaggio from './BoxMessaggio.svelte';

	export let data;
	let containerMessaggi;
	let isLoading;

	let { supabase, session, gruppo, idIscrizioneUtente, messaggi, pageSize } = data;
	$: ({ supabase, session, gruppo, idIscrizioneUtente, messaggi, pageSize } = data);

	onMount(() => {
		// ascolta il database in attesa di nuovi messaggi
		const subscritpion = listenChannelMessaggi(supabase, gruppo.id, handleNewMessage);

		return () => {
			// smette di ascoltare il database
			subscritpion.unsubscribe();
		};
	});

	async function handleNewMessage(payload) {
		const messageData = payload.new;

		const { data: profiles, error } = await getInfoProfilo(supabase, messageData.mittente);

		if (error) {
			window.alert(error);
		} else {
			const messaggio = { ...messageData, profiles };
			messaggi = [messaggio, ...messaggi];
		}
	}

	async function caricaAltro(event) {
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
			{#each messaggi as messaggio (messaggio.id)}
				<Messaggio
					{messaggio}
					isMittente={session?.user && messaggio.mittente === session?.user?.id}
				/>
			{/each}

			<CaricaAltro {caricaAltro} />
		{:else}
			<div class="h-100 d-flex justify-content-center align-items-center">
				<p class="text-subtitle fw-normal opacity-50">Ancora nessun messaggio!</p>
			</div>
		{/if}
	</div>
</div>

{#if idIscrizioneUtente || gruppo.proprietario === session?.user?.id}
	<BoxMessaggio
		{data}
		onSend={() => {
			containerMessaggi.scrollTo(0, 0);
		}}
	/>
{/if}
