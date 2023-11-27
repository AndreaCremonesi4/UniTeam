<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Modal from '../../../lib/components/modal/Modal.svelte';
	import InfoIscrittoGruppo from '../../../lib/components/gruppi/InfoIscrittoGruppo.svelte';
	import InfoGruppo from '../../../lib/components/gruppi/InfoGruppo.svelte';
	import FormCodiceIngresso from '../../../lib/components/gruppi/FormCodiceIngresso.svelte';
	import ChatGruppo from '../../../lib/components/gruppi/ChatGruppo.svelte';
	import { invalidateAll } from '$app/navigation';
	import {
		leaveGruppo,
		getIscrizioneUtente,
		listenChannelIscrizioni
	} from '../../../lib/controller/gruppi';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session, gruppo, iscritti, idIscrizioneUtente } = data;
	$: ({ supabase, session, gruppo, iscritti, idIscrizioneUtente } = data);

	async function rimuoviIscrizione(iscrizione) {
		const { error } = await leaveGruppo(supabase, iscrizione.id);

		if (error) return window.alert(error.message);
	}

	onMount(() => {
		const subscription = listenChannelIscrizioni(
			supabase,
			gruppo.id,
			handleInserimentoIscritto,
			handleRimozioneIscritto
		);

		return () => {
			// smette di ascoltare il database
			subscription.unsubscribe();
		};
	});

	async function handleInserimentoIscritto(payload) {
		const dataIscrizione = payload.new;

		const { data: iscrizione, error } = await getIscrizioneUtente(
			supabase,
			gruppo.id,
			dataIscrizione?.id_profilo
		);

		if (error) return window.alert(error.message);

		// aggiorna la lista di iscritti
		iscritti = [...iscritti, iscrizione];
	}

	async function handleRimozioneIscritto(payload) {
		const dataIscrizione = payload.old;

		const idsIscrizioni = iscritti.map((el) => {
			return el.id;
		});

		if (!idsIscrizioni.includes(dataIscrizione.id)) return;

		if (dataIscrizione.id === idIscrizioneUtente) {
			idIscrizioneUtente = undefined;
			return await invalidateAll();
		}

		iscritti = await iscritti.filter((iscrizione) => {
			return iscrizione.id !== dataIscrizione.id;
		});
	}
</script>

<Navbar {data} />

<section>
	<div class="container d-flex flex-column">
		<div class="mb-5">
			<a class="btn" href="/gruppi"><i class="bi bi-arrow-left" /> Gruppi</a>
		</div>

		{#if session?.user?.id !== gruppo.proprietario && gruppo.privato && !idIscrizioneUtente}
			<FormCodiceIngresso {data} />
		{:else}
			<InfoGruppo {data} />

			<div class="mt-3">
				<button class="btn fs-3" data-bs-toggle="modal" data-bs-target="#iscrittiModal">
					<i class="bi bi-people-fill" />
				</button>
			</div>

			<Modal id="iscrittiModal">
				<span slot="title">Iscritti</span>

				<div slot="body">
					<InfoIscrittoGruppo {data} profilo={gruppo.profiles} />
					{#each iscritti as iscritto}
						<InfoIscrittoGruppo
							{data}
							profilo={iscritto.profiles}
							rimuoviIscritto={() => {
								rimuoviIscrizione(iscritto);
							}}
						/>
					{/each}
				</div>
			</Modal>

			<ChatGruppo {data} />
		{/if}
	</div>
</section>

<Footer />

<style>
</style>
