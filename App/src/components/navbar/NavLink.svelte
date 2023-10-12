<script>
    import { page } from '$app/stores';
    export let active, href;
    
    active = $page.url.pathname.startsWith(href);
</script>

<a class="nav-link" class:active {href} aria-current="page">
    <slot />
</a>

<style>
    .nav-link{
      color: var(--bs-primary-dark);
      font-size: min(18px, calc(1rem + .75vw));
      font-style: normal;
      font-weight: 500;
      line-height: normal;

      transition: color 250ms ease-in-out;
   }
   
    .nav-link:hover,
    .nav-link.active{
        color: var(--bs-primary) !important;
    }
</style>