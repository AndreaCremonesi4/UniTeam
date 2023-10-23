<script>
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import InputGroup from '$lib/components/form/InputGroup.svelte';
	import { onMount } from 'svelte';
	import { generateAvatar } from '$lib/controller/auth/utilities';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let username, email;
	let form;

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
					//aggiorna profilo utente
					const newUsername = username.value;

					// nuovo username - nuovo logo
					if (await updateUser(newUsername)) {
						window.location.reload();
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
			const avatar = generateAvatar(newUsername.trim().charAt(0));

			const newProfile = {
				id: data.session.user.id,
				username: newUsername,
				profile_photo: avatar
			};

			const { error } = await supabase.from('profiles').upsert(newProfile).select();

			if (error) {
				console.error("Errore nell'aggiornamento del profilo utente:", error.message);
				return false;
			}
		} catch (error) {
			console.error("Errore nell'aggiornamento del profilo utente:", error.message);
			return false;
		}

		return true;
	}
</script>

<Navbar {data} />
<section class="container">
	<div class="profile d-flex flex-column align-items-center text-center">
		<img
			src={data.profile.profile_photo}
			class="user-avatar rounded-circle image-fluid"
			alt="Profilo"
		/>
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
