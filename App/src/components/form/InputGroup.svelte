<script>
    export let input;
    export let required = true;
    export let disabled;
    export let type = "text";
    export let placeholder;
</script>

<div class="input-group has-validation">
    <slot name="icon" />
    <input bind:this={input} {type} class="form-control" {placeholder} {required} {disabled}>
    <div class="invalid-feedback">
        <slot name="invalid">Compila questo campo!</slot>
    </div>
    <slot />
</div>

<style>
    input{
        padding: 0.65rem;
    }

    .input-group{
        padding: 0;
    }
</style>