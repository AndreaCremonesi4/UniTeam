<script>
	import { onMount } from 'svelte';
	import InputGroup from '$lib/components/form/InputGroup.svelte';
	import AuthForm from '$lib/components/auth/AuthForm.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { validateEmail, signInWithEmailAndPassword } from '$lib/controller/auth';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	const redirectTo = $page.url.searchParams.get('redirectTo');

	let form;
	let email, password;
	let formError;

	onMount(async () => {
		form.addEventListener(
			'submit',
			async (event) => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				} else {
					const { data, error } = await signInWithEmailAndPassword(
						supabase,
						email.value,
						password.value
					);
					if (error) {
						formError = error.status === 400 ? 'Credenziali errate' : error.message;
					} else {
						goto(redirectTo ?? '/');
					}
				}

				form.classList.add('was-validated');
			},
			false
		);

		email.addEventListener('input', (event) => {
			email.setCustomValidity(!validateEmail(email.value) ? 'error email' : '');
		});
	});
</script>

<AuthForm {data}>
	<h1 class="text-title text-gradient-reverse">Login</h1>

	<form class="row g-3 mt-2" bind:this={form} novalidate>
		<InputGroup bind:input={email} placeholder="Email" type="email" required>
			<span slot="icon" class="input-group-text gradient-light" id="email">
				<i class="bi bi-envelope text-white" />
			</span>
			<span slot="invalid">Inserisci un'email valida</span>
		</InputGroup>

		<InputGroup bind:input={password} type="password" placeholder="Password">
			<span slot="icon" class="input-group-text gradient-light">
				<i class="bi bi-key text-white" />
			</span>
		</InputGroup>

		{#if formError}
			<div class="alert alert-danger d-flex align-items-center gap-2" role="alert">
				<i class="bi bi-exclamation-triangle-fill" />
				{formError}
			</div>
		{/if}

		<a href="/recupero-password" class="mt-1">Hai dimenticato la password?</a>

		<button class="btn btn-primary btn-gradient-reverse sub-header" type="submit">Login</button>
	</form>

	<p class="mt-3">
		Non hai ancora un account? <a
			href="/registrazione{redirectTo ? `?redirectTo=${redirectTo}` : ''}">Registrati</a
		>
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
</style>
