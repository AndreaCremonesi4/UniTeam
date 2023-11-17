<script>
	import { onMount } from 'svelte';

	export let labels = [];
	let activeTab = 0;
	let tabs = [];

	onMount(() => {
		const content = document.getElementById('content');
		tabs = Array.from(content.children);
		aggiornaTabs();
		content.style.display = 'block';
	});

	function aggiornaTabs() {
		tabs.forEach((tab, index) => {
			tab.style.display = index === activeTab ? 'block' : 'none';
		});
	}

	function cambiaTab(index) {
		activeTab = index;
		aggiornaTabs();
	}
</script>

<div class="d-flex w-100">
	<ul class="w-100 nav nav-tabs">
		{#each labels as label, index}
			<li class="nav-item">
				<button
					class="nav-link {index === activeTab ? 'active' : ''}"
					on:click={() => cambiaTab(index)}>{label}</button
				>
			</li>
		{/each}
	</ul>
</div>

<div id="content" style="display: none;">
	<slot />
</div>
