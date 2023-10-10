<script>
    import { onMount } from "svelte";
	import InputGroup from "../../../components/form/InputGroup.svelte";
    import AuthForm from "../../../components/auth/AuthForm.svelte";

    let form;
    let email, password;

    onMount(() => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated');
        }, false);
    });
    
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

    <p class="mt-3">Non hai ancora un account? <a href="/registrazione">Registrati</a></p>
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