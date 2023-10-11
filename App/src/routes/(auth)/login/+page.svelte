<script>
    import { onMount } from "svelte";
	import InputGroup from "../../../components/form/InputGroup.svelte";
    import AuthForm from "../../../components/auth/AuthForm.svelte";
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    export let data;
    let { supabase } = data;
    $: ({ supabase } = data);

    let form;
    let email, password;

    const redirectTo = $page.url.searchParams.get('redirectTo');

    onMount(async () => {
        form.addEventListener('submit', async (event) => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                const error = await signInWithEmail();
                if(!error)
                    goto(redirectTo ?? '/');
            }            
            
            form.classList.add('was-validated');
        }, false);
    });

    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });

        return error;
    }
    
</script>

<AuthForm>
    <h1 class="text-title text-gradient-reverse">Login</h1>

    <form class="row g-3 mt-2" bind:this={form} novalidate>
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

        <a href="/" class="mt-1">Hai dimenticato la password?</a>

        <button class="btn btn-primary btn-gradient-reverse sub-header" type="submit">Login</button>
    </form>

    <p class="mt-3">Non hai ancora un account? <a href="/registrazione{redirectTo ? `?redirectTo=${redirectTo}` : ''}">Registrati</a></p>
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