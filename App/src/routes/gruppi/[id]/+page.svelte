<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Modal from '../../../lib/components/modal/Modal.svelte';
	import InfoIscrittoGruppo from '../../../lib/components/gruppi/InfoIscrittoGruppo.svelte';
	import InfoGruppo from '../../../lib/components/gruppi/InfoGruppo.svelte';
	import FormCodiceIngresso from '../../../lib/components/gruppi/FormCodiceIngresso.svelte';
	import ChatGruppo from '../../../lib/components/gruppi/ChatGruppo.svelte';
	import { invalidateAll } from '$app/navigation';
	import { leaveGruppo } from '../../../lib/controller/gruppi';

	export let data;

	let { supabase, session, gruppo, iscritti, idIscrizioneUtente } = data;
	$: ({ supabase, session, gruppo, iscritti, idIscrizioneUtente } = data);

	console.log(iscritti);

	async function rimuoviIscrizione(iscrizione) {
		iscritti = iscritti.filter((iscritto) => {
			return iscritto.profiles.id !== iscrizione.profiles.id;
		});

		const { error } = await leaveGruppo(supabase, iscrizione.id);

		if (error) return window.alert(error.message);

		invalidateAll();
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
