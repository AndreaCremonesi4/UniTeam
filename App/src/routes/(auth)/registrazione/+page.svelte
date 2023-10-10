<script>
    import { onMount } from "svelte";
	import InputGroup from "../../../components/form/InputGroup.svelte";
    import AuthForm from "../../../components/auth/AuthForm.svelte";

    export let data;
    let { supabase } = data;
    $: ({ supabase } = data);

    let form;
    let username, email, password, confirmPassword;


    const handleSignUp = async () => {
        console.log(password.value)
        const {error} = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });

        console.log(error);
    }

    onMount(async () => {
        form.addEventListener('submit', async (event) => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated');

            // registra l'utente
            await handleSignUp();
            
        }, false);

        form.addEventListener('input', event => {
            confirmPassword.setCustomValidity(confirmPassword.value !== password.value ? 'Le password non concidono' : '');
        });

        password.addEventListener('input', event => {
            if(password.value != confirmPassword.value)
                confirmPassword.value = '';
            
            confirmPassword.disabled = password.value.trim() === ''
        })
    });
    
</script>

<AuthForm>
    <h1 class="text-title text-gradient-reverse">Registrazione</h1>
    
    <form class="row g-3 mt-2" bind:this={form} novalidate>
        <InputGroup bind:input={username} placeholder="Nome Utente" required>
            <span slot="icon" class="input-group-text gradient-light">
                <i class="bi bi-person text-white"></i>
            </span>
        </InputGroup>

        <InputGroup bind:input={email} placeholder="Email" type="email" required>
            <span slot="icon" class="input-group-text gradient-light" id="email">
                <i class="bi bi-envelope text-white"></i>
            </span>
        </InputGroup>

        <InputGroup bind:input={password} type="password" placeholder="Password">
            <span slot="icon" class="input-group-text gradient-light">
                <i class="bi bi-key text-white" />
            </span>
        </InputGroup>

        <InputGroup bind:input={confirmPassword} type="password" placeholder="Conferma Password" disabled>
            <span slot="icon" class="input-group-text gradient-light">
                <i class="bi bi-key-fill text-white" />
            </span>
            <span slot="invalid">
                Le password non concidono!
            </span>
        </InputGroup>

        <button class="btn btn-primary btn-gradient-reverse sub-header" type="submit">Registrati</button>
    </form>

    <p class="mt-3">Hai già un account? <a href="/login">Accedi</a></p>
</AuthForm>

<style>
    form{
        width: min(100%, 400px);
        padding: 0 1rem;
        text-align: left;
    }

    form > button{
        width: 100%;
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
</style>