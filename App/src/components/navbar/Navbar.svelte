<script>
	import NavLink from "./NavLink.svelte";

</script>
<nav class="navbar fixed-top navbar-expand-lg bg-white" aria-label="Offcanvas navbar large">
    <div class="container">
       
        <a class="navbar-brand d-flex gap-4 align-items-center" href="/">
          <h1 class="text-gradient nav-title">UniTeam</h1>
       </a>
       
       <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2" aria-label="Toggle navigation">
        <img src="assets/icons/hamburger-menu.svg" alt=""/>
       </button>
       
       <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
          
         <div class="offcanvas-header">
             <img src="assets/images/logo.png" style="height:50px" alt="logo"/>
             <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

          <div class="offcanvas-body">
             <ul class="navbar-nav justify-content-end flex-grow-1 pe-3 align-items-center gap-4">
               <li class="nav-item">
                  <NavLink href="/" active>Professori</NavLink>
               </li>
               <li class="nav-item">
                  <NavLink href="/">Corsi</NavLink>
               </li>
               <li class="nav-item">
                  <NavLink href="/">Gruppi</NavLink>
               </li>
               <li class="nav-item">
                  <button class="btn btn-primary sub-header" style='padding: 0.7rem 3rem; margin-left:0.5rem;'>Accedi</button>
               </li>
             </ul>
          </div>

       </div>
    </div>
 </nav>


 <style>
   .navbar-toggler{
      border: none;
   }

   .navbar-toggler:focus,
   .btn-close:focus{
      box-shadow: none;
   }
 </style>