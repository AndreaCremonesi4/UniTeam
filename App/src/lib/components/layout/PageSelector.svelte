<script>
	import { createEventDispatcher } from 'svelte';
	import SelectInput from '../form/SelectInput.svelte';

	export let page;
	export let pageCount;

	const dispatch = createEventDispatcher();

	function changePage(index) {
		if (index < 0) index = 0;
		else if (index > pageCount - 1) index = pageCount - 1;
		page = index;

		dispatch('pageChange', {
			page
		});
	}
</script>

{#if pageCount}
	<nav class={$$props.class}>
		<ul class="pagination">
			<li class="page-item {page === 0 ? 'disabled' : ''}">
				<button
					class="page-link {page > 0 ? 'bg-primary text-white' : ''}"
					on:click={() => {
						changePage(page - 1);
					}}><i class="bi bi-chevron-left" /></button
				>
			</li>
			<div class="px-2 d-flex align-items-center">
				<SelectInput
					showDefaultValue={false}
					bind:input={page}
					onChange={() => {
						changePage(page);
					}}
					options={Array.from(Array(pageCount).keys()).map((el) => {
						return { value: el, label: el + 1 };
					})}
				/>
			</div>

			<li class="page-item {page === pageCount - 1 ? 'disabled' : ''}">
				<button
					class="page-link {page < pageCount - 1 ? 'bg-primary text-white' : ''}"
					on:click={() => {
						changePage(page + 1);
					}}><i class="bi bi-chevron-right" /></button
				>
			</li>
		</ul>
	</nav>
{/if}
