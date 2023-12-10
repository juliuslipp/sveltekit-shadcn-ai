<script lang="ts">
  import { page } from "$app/stores";
  import Cookies from "$components/cookies.svelte";
  import { SidebarNav, SiteFooter, SiteHeader } from "$components/layout";
  import { dashboardConfig } from "$lib/config/dashboard";

  const user = $page.data.session?.user;
</script>

<div class="flex min-h-screen flex-col">
  <SiteHeader sidebarNavItems={dashboardConfig.sidebarNav} />

  <div
    class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
  >
    <aside
      class="fixed top-14 z-30 hidden h-full w-full shrink-0 overflow-y-auto md:sticky md:block"
    >
      <div class="py-6 pr-6 lg:py-6 h-full">
        <SidebarNav items={dashboardConfig.sidebarNav} />
      </div>
    </aside>

    <main class="flex w-full flex-col overflow-hidden">
      <Cookies />

      <slot />
    </main>
  </div>

  <SiteFooter />
</div>
