<script>
	import NavLink from './NavLink.svelte';
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
</script>

<nav class="navbar fixed-top navbar-expand-lg bg-white" aria-label="Offcanvas navbar large">
	<div class="container">
		<a class="navbar-brand d-flex gap-4 align-items-center" href="/">
			<h1 class="text-gradient nav-title">UniTeam</h1>
		</a>

		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="offcanvas"
			data-bs-target="#offcanvasNavbar2"
			aria-controls="offcanvasNavbar2"
			aria-label="Toggle navigation"
		>
			<img src="assets/icons/hamburger-menu.svg" alt="" />
		</button>

		<div
			class="offcanvas offcanvas-end"
			tabindex="-1"
			id="offcanvasNavbar2"
			aria-labelledby="offcanvasNavbar2Label"
		>
			<div class="offcanvas-header">
				<img src="assets/images/logo.png" style="height:50px" alt="logo" />
				<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
			</div>

			<div class="offcanvas-body">
				<ul class="navbar-nav justify-content-end flex-grow-1 pe-3 align-items-center gap-4">
					<li class="nav-item">
						<NavLink href="/professori">Professori</NavLink>
					</li>
					<li class="nav-item">
						<NavLink href="/corsi">Corsi</NavLink>
					</li>
					<li class="nav-item">
						<NavLink href="/">Gruppi</NavLink>
					</li>
					{#if !data.session}
						<li class="nav-item">
							<a
								href="/login"
								class="btn btn-primary sub-header"
								style="padding: 0.7rem 3rem; margin-left:0.5rem;">Accedi</a
							>
						</li>
					{:else}
						<div class="dropdown show">
							<a
								class="btn dropdown-toggle"
								href="/"
								role="button"
								id="dropdownMenuLink"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<li class="nav-item">
									<i class="bi bi-person-circle" />
								</li>
							</a>

							<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
								<a class="dropdown-item" href="/">Action</a>
								<a class="dropdown-item" href="/">Another action</a>
								<a class="dropdown-item" href="/">Something else here</a>
							</div>
						</div>
					{/if}
				</ul>
			</div>
		</div>
	</div>
</nav>

<style>
	.navbar-toggler {
		border: none;
	}

	.navbar-toggler:focus,
	.btn-close:focus {
		box-shadow: none;
	}
</style>
