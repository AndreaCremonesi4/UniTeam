<script>
	import { onMount } from 'svelte';
	import InputGroup from '$lib/components/form/InputGroup.svelte';
	import { validatePassword } from '$lib/controller/auth';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let form;
	let password, confirmPassword;
	let passwordError = 'Compila questo campo!',
		showSuccess,
		formError;

	onMount(() => {
		form.addEventListener(
			'submit',
			async (event) => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();

					form.classList.add('was-validated');
				} else {
					// registra l'utente
					const { error } = await supabase.auth.updateUser({ password: password.value });

					if (!error) {
						showSuccess = true;

						// refresh form
						form.classList.remove('was-validated');
						form.reset();
					} else {
						if (error.status === 422)
							formError = 'La nuova password deve essere diversa da quella precedente!';
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

		password.addEventListener('input', (event) => {
			passwordError = validatePassword(password.value);
			password.setCustomValidity(passwordError ?? '');
			confirmPassword.disabled = password.value.trim() === '';
		});
	});
</script>

<section>
	<div class="container d-flex flex-column align-items-center justify-content-center">
		{#if showSuccess}
			<h1 class="text-title">Password modificata con successo!</h1>
			<a href="/login" class="btn btn-primary mt-2">Vai alla pagina di accesso</a>
		{:else}
			<form bind:this={form} novalidate>
				<h1 class="text-title mb-5 text-center">Aggiorna Password</h1>
				<p class="text-body-secondary">Aggiorna la password del tuo account</p>
				<div class="form-group">
					<span>Nuova Password</span>
					<InputGroup
						bind:input={password}
						type="password"
						placeholder="Password"
						minlength="6"
						class="mb-3"
					>
						<span slot="invalid">{passwordError}</span>
					</InputGroup>

					<span>Conferma Password</span>
					<InputGroup
						bind:input={confirmPassword}
						type="password"
						placeholder="Conferma Password"
						disabled
					>
						<span slot="invalid">Le password non concidono!</span>
					</InputGroup>
				</div>
				{#if formError}
					<div class="alert alert-danger d-flex align-items-center gap-4 mt-4" role="alert">
						<i class="bi bi-exclamation-triangle-fill" />
						{formError}
					</div>
				{/if}
				<button class="btn btn-primary mt-3">Invia</button>
			</form>
		{/if}
	</div>
</section>

<style>
	form {
		width: min(500px, 100%);
	}

	form {
		display: flex;
		flex-direction: column;
	}

	.btn {
		padding: 0.75rem 1rem;
		border-radius: 7px;
	}
</style>
