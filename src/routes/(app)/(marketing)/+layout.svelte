<script>
  import { page } from "$app/stores";
  import { SiteFooter, SiteHeader } from "$components/layout";
  import { breakpointsStore } from "$lib/stores/breakpoint-store";

  $: reactiveMenu = $page.url.pathname === "/" && $breakpointsStore.isMd;
</script>

<div class="bg-background min-h-full w-full flex flex-col">
  <SiteHeader {reactiveMenu}></SiteHeader>

  <main class="flex-1 w-full">
    <slot />
  </main>

  <SiteFooter></SiteFooter>
</div>
