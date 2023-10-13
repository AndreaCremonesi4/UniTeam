<script>
	import { enhance } from '$app/forms';
	import { validateEmail } from '$lib/auth/utilities';
	import { onMount } from 'svelte';
	import InputGroup from '../../../components/form/InputGroup.svelte';
	/*await supabase.auth.resetPasswordForEmail('hello@example.com', {
		redirectTo: `${location.origin}/aggiorna-password`
	});

	await supabase.auth.updateUser({ password: new_password });*/
	
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let form, email;
	let showSuccess;

	onMount(async () => {
		form.addEventListener(
			'submit',
			async (event) => {
				showSuccess = false;

				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
					form.classList.add('was-validated');
				} else {
					form.reset();
					showSuccess = true;
					form.classList.remove('was-validated');
				}
			},
			false
		);

		email.addEventListener('input', (event) => {
			email.setCustomValidity(!validateEmail(email.value) ? 'error email' : '');
		});
	});

</script>

<section>
	<div class="container d-flex flex-column align-items-center justify-content-center">
		{#if showSuccess}
			<div class="alert alert-success text-start d-flex justify-content-between gap-4" role="alert">
				<div>
					<h4 class="alert-heading">Email inviata con successo!</h4>
					<p>Controlla la tua casella di posta elettronica.</p>
				</div>
				<button type="button" class="btn-close py-0" on:click={() => showSuccess = false}></button>
			</div>
		{/if}

		<form bind:this={form} novalidate>
			<h1 class="text-title mb-5 text-center">Recupero Password</h1>
			<p class="text-body-secondary">Inserire l'indirizzo email associato al tuo account e ti invieremo un link per ripristinare la password</p>
			<div class="form-group">
				<span>Email</span>
				<InputGroup bind:input={email} type="email">
					<span slot="invalid">
						Inserisci un'email valida
					</span>
				</InputGroup>
			</div>
			<button class="btn btn-primary mt-3">Invia</button>
		</form>
	</div>
</section>


<style>
	.alert,
	form{
		width:min(500px, 100%);
	}

	form{
		display: flex;
		flex-direction: column;
	}

	form > button{
		padding: 0.75rem 0;
		border-radius:7px;
	}
</style>