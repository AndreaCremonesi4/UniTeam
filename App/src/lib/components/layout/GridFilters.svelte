<script>
	let isFilterOpen = true;

	function toggleFilters() {
		isFilterOpen = !isFilterOpen;
	}
</script>

<div class="filter-wrapper {isFilterOpen ? 'open' : ''} ">
	<button class="show-filters-btn btn" on:click={toggleFilters}
		><i class="bi bi-funnel" />
		<i class="bi {isFilterOpen ? 'bi-chevron-down' : 'bi-chevron-up'}" /></button
	>
	<div class="filters my-2 d-flex gap-2 flex-wrap">
		<slot />
	</div>
</div>

<style>
	.filter-wrapper {
		position: relative;
	}

	.show-filters-btn {
		display: none;
	}

	@media (max-width: 768px) {
		.filter-wrapper {
			z-index: 100;
			position: fixed;
			background-color: var(--bs-primary-dark);

			display: flex;
			align-items: center;
			padding: 1rem 1rem;
			inset: auto -1px 0 0;
			margin: 0 !important;

			color: white;

			transition: transform 250ms ease-in-out;
		}

		.filter-wrapper.open {
			transform: translateY(0);
		}

		.filter-wrapper {
			transform: translateY(100%);
		}

		.filters {
			max-height: min(50vh, 250px);
			overflow-y: scroll;
		}

		.filters > div {
			max-width: 100%;
			width: 100%;
		}

		.show-filters-btn {
			display: block;
			position: absolute;
			right: 0;
			top: 0;
			transform: translateY(-99%);
			background: var(--bs-primary-dark);
			color: white;
			border-radius: 5px 5px 0 0;
		}

		.show-filters-btn:focus {
			background-color: var(--bs-primary-dark);
		}
	}
</style>
