<script lang="ts">
  import { page } from "$app/stores";
  import { Icons } from "$components/icons";
  import { siteConfig } from "$lib/config/site";
  import { cn } from "$lib/utils";

  import { type NavItemWithOptionalChildren } from "../../types/nav";

  export let mainNavItems: NavItemWithOptionalChildren[] = siteConfig.mainNav;
</script>

<a href="/" class="flex items-center space-x-2 mr-auto">
  <Icons.logo class="h-6 w-6" />
  <span class="hidden font-bold sm:inline-block">
    {siteConfig.name}
  </span>
</a>

<nav class="flex items-center space-x-6 text-sm font-medium">
  {#each mainNavItems as navItem}
    <a
      href={navItem.href}
      class={cn(
        "transition-colors hover:text-foreground/80",
        $page.url.pathname === navItem.href
          ? "text-foreground"
          : "text-foreground/60"
      )}
      target={navItem.external ? "_blank" : undefined}
      rel={navItem.external ? "noreferrer" : undefined}
    >
      {navItem.title}
    </a>
  {/each}
</nav>
