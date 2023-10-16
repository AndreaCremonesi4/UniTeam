<script>
	import Navbar from '../../../../components/navbar/Navbar.svelte';
	import InputGroup from '../../../../components/form/InputGroup.svelte';
	import { onMount } from 'svelte';
	import { generateAvatar } from '$lib/auth/utilities';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let src;
	let form;
	let username, email;
	let showSuccess;

	onMount(async () => {
		const { data: profile, error } = await supabase //aggiungi errore
			.from('profiles')
			.select('id, username, profile_photo')
			.eq('id', data.session.user.id)
			.single();
		src = profile.profile_photo;

		username.value = profile.username;
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
					const newUsername = username.value;

					// nuovo username - nuovo logo
					// controlla docs supabase per error
					if (updateUser(newUsername)) {
						showSuccess = true;
					}
				}
			},
			false
		);

		username.addEventListener('input', (_event) => {
			username.setCustomValidity(username.value.trim() === '' ? 'Username vuoto' : '');
		});
	});

	async function updateUser(newUsername) {
		try {
			//trovare funzione per modificare nome utente
			console.log(newUsername);
			const avatar = generateAvatar(newUsername.trim().charAt(0));
			const { error } = await supabase
				.from('profiles')
				.update({
					username: newUsername,
					profile_photo: avatar
				})
				.eq('id', data.session.user.id);

			src = avatar;

			if (error) {
				console.error("Errore nell'aggiornamento del profilo utente:", error.message);
				return false;
			}
			console.log('Profilo utente aggiornato con successo:', data);
			return true;
		} catch (error) {
			console.error("Errore nell'aggiornamento del profilo utente:", error.message);
			return false;
		}
	}
</script>

<Navbar {data} />
<section class="container">
	<div class="profile d-flex flex-column align-items-center text-center">
		<img {src} class="user-avatar rounded-circle image-fluid" alt="Responsive" />
		<h1 class="text-title">Il mio profilo</h1>

		<form class="row d-flex flex-column align-items-center g-3 mt-2" bind:this={form} novalidate>
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
