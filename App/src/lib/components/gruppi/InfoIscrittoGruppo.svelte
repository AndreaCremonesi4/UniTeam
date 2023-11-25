<script>
	export let data;
	export let profilo;
	export let rimuoviIscritto;
	let showChoice;

	let { session, gruppo } = data;
	$: ({ session, gruppo } = data);
</script>

<div class="d-flex justify-content-between align-items-center w-100 {$$props.class}">
	{#if showChoice}
		<div>
			<p class="mb-0">Vuoi rimuovere {profilo.username}?</p>
		</div>
		<div>
			<button
				class="rounded-1 btn btn-outline-success border border-success"
				on:click={() => {
					showChoice = false;
				}}
			>
				<i class="bi bi-x-lg" />
			</button>
			<button
				class="rounded-1 btn btn-outline-danger border border-danger"
				on:click={rimuoviIscritto}
			>
				<i class="bi bi-check-lg" />
			</button>
		</div>
	{:else}
		<div class="d-flex w-100 align-items-center mb-2">
			<img
				class="rounded-circle"
				style="max-width: min(40px, 10vw);"
				src={profilo?.profile_photo}
				alt=""
			/>
			<p class="ms-2 mb-0 fw-normal">
				{session && session.user.id === profilo.id ? 'Tu' : profilo.username}
				{#if profilo.id === gruppo.proprietario}
					<em> (Proprietario)</em>
				{/if}
			</p>
		</div>

		{#if session && profilo.id != session?.user?.id && session?.user?.id === gruppo.proprietario}
			<div>
				<button
					class="btn btn-outline-danger border border-2 border-danger rounded-1"
					on:click={() => {
						showChoice = true;
					}}
				>
					<i class="bi bi-person-x" />
				</button>
			</div>
		{/if}
	{/if}
</div>
