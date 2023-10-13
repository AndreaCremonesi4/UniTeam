<script>
	import Navbar from '../../../../components/navbar/Navbar.svelte';
	import InputGroup from '../../../../components/form/InputGroup.svelte';
	import { onMount } from 'svelte';
	let form;
	let username, email;

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	onMount(() => {
		username.value = data.session.user.user_metadata.username;
		email.value = data.session.user.email;

		form.addEventListener(
			'submit',
			async (event) => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();

					form.classList.add('was-validated');
				} else {
					//aggiorna profilo utente
					// controlla docs supabase per error
					if (!error) {
						showSuccess = true;

						// refresh form
						form.classList.remove('was-validated');
						form.reset();
					}
				}
			},
			false
		);

		username.addEventListener('input', (event) => {
			username.setCustomValidity(username.value.trim() === '' ? 'Username vuoto' : '');
		});
	});
</script>

<Navbar {data} />
<section class="container">
	<div class="profile d-flex flex-column align-items-center text-center">
		<img
			src={data.session.user.user_metadata.profile_photo}
			class="user-avatar rounded-circle image-fluid"
			alt="Responsive"
		/>
		<h1 class="text-title">Il mio profilo</h1>

		<form class="row g-3 mt-2" bind:this={form} novalidate>
			<InputGroup bind:input={username} placeholder="Nome Utente" required>
				<span slot="icon" class="input-group-text gradient-light">
					<i class="bi bi-person text-white" />
				</span>
			</InputGroup>

			<InputGroup bind:input={email} placeholder="Email" type="email" readonly>
				<span slot="icon" class="input-group-text gradient-light" id="email">
					<i class="bi bi-envelope text-white" />
				</span>
				<span slot="invalid">Inserisci un'email valida</span>
			</InputGroup>
		</form>
	</div>
</section>

<style>
	.user-avatar {
		margin: 3rem, 1rem;
		width: min(90%, 200px);
	}
</style>
