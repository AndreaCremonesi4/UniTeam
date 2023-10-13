<script>
    export let data;
    let { supabase } = data;
	$: ({ supabase } = data);

    const loginWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                access_type: 'offline',
                prompt: 'consent',
                },
            },
        });
    }

</script>

<div class="container">
    <a data-sveltekit-reload href="/"><button class="btn-close"></button></a>

    <slot />

    <div class="divider mt-5 mb-5">
        <span>Oppure</span>
    </div>
    
    <button class="btn google-btn" on:click={loginWithGoogle}>
        <img src="assets/images/google_logo.webp" alt="">
        <span>Accedi con Google</span>
    </button>
</div>

<style>
    .btn-close{
        position: absolute;
        right: 1rem;
        top:1rem;
        background-size: 25px;

        border: none;
        outline: none;
        box-shadow: none;
    }

    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        padding: 4rem 0;
    }

    .divider{
        background-color: var(--bs-primary-dark);
        height: 1px;
        width: min(90%, 500px);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .divider > span{
        background-color: white;
        padding: 1rem 1rem;
    }

    .google-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5%;

        width: min(90%, 370px);

        border: 1px solid gray;
        padding: 0.65rem 1rem;
    }

    .google-btn > img{
        height: 25px;
    }
</style>