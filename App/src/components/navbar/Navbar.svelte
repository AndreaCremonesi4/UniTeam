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
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown">
								<i class="bi bi-person-circle" style="font-size: 20px;" />
							</a>
							<div class="container d-flex">
								<div
									class="dropdown-menu align-items-center text-center"
									aria-labelledby="navbarDropdown"
								>
									<a class="dropdown-item" type="button" href="/">Il mio profilo</a>
									<a class="dropdown-item" type="button" href="/">Le mie recensioni</a>
									<div class="dropdown-divider" />
									<button
										class="btn btn-primary py-2 px-3"
										on:click={() => data.supabase.auth.signOut()}
										style="z-index:1000">Logout</button
									>
								</div>
							</div>
						</li>
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

	.dropdown-menu {
		position: absolute;
		top: 50;
		left: 0;
		transform: translateX(-37%);
	}
</style>
