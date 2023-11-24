<script>
	import { logout } from '$lib/controller/auth';
	import NavLink from './NavLink.svelte';
	import { page } from '$app/stores';

	import logo from '$lib/assets/images/logo.png';
	import hamburger from '$lib/assets/icons/hamburger-menu.svg';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
</script>

<nav class="navbar fixed-top navbar-expand-lg bg-white" aria-label="Offcanvas navbar large">
	<div class="container">
		<a class="navbar-brand d-flex gap-4 align-items-center" href="/">
			<h1 class="text-gradient nav-title mb-0">UniTeam</h1>
		</a>

		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="offcanvas"
			data-bs-target="#offcanvasNavbar2"
			aria-controls="offcanvasNavbar2"
			aria-label="Toggle navigation"
		>
			<img src={hamburger} alt="" />
		</button>

		<div
			class="offcanvas offcanvas-end"
			tabindex="-1"
			id="offcanvasNavbar2"
			aria-labelledby="offcanvasNavbar2Label"
		>
			<div class="offcanvas-header">
				<img src={logo} style="height:50px" alt="logo" />
				<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
			</div>

			<div class="offcanvas-body">
				<ul class="navbar-nav justify-content-end flex-grow-1 pe-3 align-items-center gap-4">
					<li class="nav-item">
						<NavLink href="/gruppi">Gruppi</NavLink>
					</li>
					<li class="nav-item">
						<NavLink href="/corsi">Corsi</NavLink>
					</li>
					<li class="nav-item">
						<NavLink href="/professori">Professori</NavLink>
					</li>
					{#if !data.session}
						<li class="nav-item">
							<a
								href="/login?redirectTo={$page.url.pathname}"
								class="btn btn-primary sub-header"
								style="padding: 0.7rem 3rem; margin-left:0.5rem;">Accedi</a
							>
						</li>
					{:else}
						<li
							class="nav-item dropdown d-flex flex-column align-items-center justify-content-center"
						>
							<button
								class="btn dropdown-toggle"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<img src={data.profile.profile_photo} class="user-avatar" alt="" />
							</button>
							<ul class="dropdown-menu dropdown-menu-end">
								<div class="d-flex flex-column justify-content-center px-2">
									<a class="dropdown-item" type="button" href="/account/profilo">Il mio profilo</a>
									<a class="dropdown-item" type="button" href="/account/recensioni">
										Le mie recensioni
									</a>
									<a class="dropdown-item" type="button" href="/account/i-miei-gruppi">
										I miei Gruppi
									</a>

									<div class="dropdown-divider" />

									<button class="btn btn-primary py-2 px-3" on:click={() => logout(supabase.auth)}
										>Logout</button
									>
								</div>
							</ul>
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

	.user-avatar {
		width: 28px;
		border-radius: 1000px;
	}
</style>
