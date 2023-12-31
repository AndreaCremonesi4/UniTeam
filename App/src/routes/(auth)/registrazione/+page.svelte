<script>
	import { onMount } from 'svelte';
	import InputGroup from '$lib/components/form/InputGroup.svelte';
	import AuthForm from '$lib/components/auth/AuthForm.svelte';
	import { page } from '$app/stores';
	import {
		validateEmail,
		validatePassword,
		signUpWithEmailAndPassword,
		checkIfUsernameExists
	} from '$lib/controller/auth';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	const redirectTo = $page.url.searchParams.get('redirectTo');

	let form, formError;
	let username, email, password, confirmPassword;
	let showSuccess;
	let passwordError = 'La password deve contenere almeno 6 caratteri!';

	onMount(async () => {
		form.addEventListener(
			'submit',
			async (event) => {
				formError = undefined;

				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();

					form.classList.add('was-validated');
				} else {
					// registra l'utente
					const { error } = await signUpWithEmailAndPassword(
						supabase,
						email.value,
						password.value,
						username.value,
						redirectTo
					);

					if (!error) {
						showSuccess = true;

						// refresh form
						form.classList.remove('was-validated');
						form.reset();
					} else {
						formError = error.message;
					}
				}
			},
			false
		);

		form.addEventListener('input', (event) => {
			confirmPassword.setCustomValidity(
				confirmPassword.value !== password.value ? 'Le password non concidono' : ''
			);
		});

		username.addEventListener('input', (event) => {
			username.setCustomValidity(username.value.trim() === '' ? 'Username vuoto' : '');
		});

		email.addEventListener('input', (event) => {
			email.setCustomValidity(!validateEmail(email.value) ? 'Email error' : '');
		});

		password.addEventListener('input', (event) => {
			passwordError = validatePassword(password.value);
			password.setCustomValidity(passwordError ?? '');
			confirmPassword.disabled = password.value.trim() === '';
		});
	});
</script>

<AuthForm {data}>
	{#if showSuccess}
		<div class="alert alert-success text-start d-flex" role="alert">
			<div>
				<div class="d-flex gap-3">
					<i class="bi bi-check-circle-fill" />
					<h4 class="alert-heading">Registrazione effettuata con successo!</h4>
				</div>
				<p>Controlla la tua casella di posta elettronica per attivare il tuo account UniTeam.</p>
			</div>
			<button type="button" class="btn-close" on:click={() => (showSuccess = false)} />
		</div>
	{/if}

	{#if formError}
		<div class="alert alert-danger d-flex align-items-center gap-2" role="alert">
			<i class="bi bi-exclamation-triangle-fill" />
			{formError}
		</div>
	{/if}

	<h1 class="text-title text-gradient-reverse">Registrazione</h1>

	<form class="row g-3 mt-2" bind:this={form} novalidate>
		<InputGroup bind:input={username} placeholder="Nome Utente" required>
			<span slot="icon" class="input-group-text gradient-light">
				<i class="bi bi-person text-white" />
			</span>
		</InputGroup>

		<InputGroup bind:input={email} placeholder="Email" type="email" required>
			<span slot="icon" class="input-group-text gradient-light" id="email">
				<i class="bi bi-envelope text-white" />
			</span>
			<span slot="invalid">Inserisci un'email valida</span>
		</InputGroup>

		<InputGroup bind:input={password} type="password" placeholder="Password" minlength="6">
			<span slot="icon" class="input-group-text gradient-light">
				<i class="bi bi-key text-white" />
			</span>
			<span slot="invalid">{passwordError}</span>
		</InputGroup>

		<InputGroup
			bind:input={confirmPassword}
			type="password"
			placeholder="Conferma Password"
			disabled
		>
			<span slot="icon" class="input-group-text gradient-light">
				<i class="bi bi-key-fill text-white" />
			</span>
			<span slot="invalid">Le password non concidono!</span>
		</InputGroup>

		<button class="btn btn-primary btn-gradient-reverse sub-header" type="submit">Registrati</button
		>
	</form>

	<p class="mt-3">
		Hai già un account? <a href="/login{redirectTo ? `?redirectTo=${redirectTo}` : ''}">Accedi</a>
	</p>
</AuthForm>

<style>
	form {
		width: min(100%, 400px);
		padding: 0 1rem;
		text-align: left;
	}

	form > button {
		width: 100%;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}

	.alert {
		width: min(600px, 90%);
	}
</style>
