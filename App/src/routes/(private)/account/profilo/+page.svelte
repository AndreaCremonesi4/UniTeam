<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import InputGroup from '$lib/components/form/InputGroup.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { updateProfileUsername } from '$lib/controller/profilo';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let username, email;
	let form, formError;

	onMount(async () => {
		username.value = data.profile.username;
		email.value = data.session.user.email;
		form.addEventListener(
			'submit',
			async (event) => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();

					form.classList.add('was-validated');
				} else {
					const { error } = await updateProfileUsername(
						supabase,
						data.session.user.id,
						username.value
					);

					if (!error) {
						invalidateAll();
						formError = undefined;
					} else {
						switch (error.code) {
							case '23505':
								formError = 'Username non disponibile';
								break;
							default:
								formError = error.message;
						}
					}
				}
			},
			false
		);

		username.addEventListener('input', (_event) => {
			username.setCustomValidity(username.value.trim() === '' ? 'Username vuoto' : '');
		});
	});
</script>

<Navbar {data} />
<section class="container">
	<div class="profile d-flex flex-column align-items-center text-center">
		<img
			src={data.profile.profile_photo}
			class="user-avatar rounded-circle image-fluid"
			alt="Profilo"
		/>
		<h1 class="text-title mb-4">Il mio profilo</h1>

		{#if formError}
			<div class="alert alert-danger d-flex align-items-center gap-4" role="alert">
				<i class="bi bi-exclamation-triangle-fill" />
				{formError}
			</div>
		{/if}

		<form class="row d-flex flex-column align-items-center g-3" bind:this={form} novalidate>
			<InputGroup bind:input={username} placeholder="Nome Utente" required>
				<span slot="icon" class="input-group-text gradient-light">
					<i class="bi bi-person text-white" />
				</span>
			</InputGroup>

			<InputGroup bind:input={email} placeholder="Email" type="email" disabled readonly>
				<span slot="icon" class="input-group-text gradient-light" id="email">
					<i class="bi bi-envelope text-white" />
				</span>
			</InputGroup>

			<button class="btn btn-primary" type="submit" alt="Responsive">Aggiorna</button>

			<a href="/recupero-password?redirectTo={$page.url.pathname}" class="mt-2"
				>Vuoi cambiare la password?</a
			>
		</form>
	</div>
</section>

<style>
	.user-avatar {
		margin: 3rem, 1rem;
		width: min(90%, 200px);
	}

	form {
		width: min(100%, 400px);
		padding: 0 1rem;
		text-align: left;
	}

	form > button {
		width: 100%;
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
		border-radius: 5px;
	}
</style>
