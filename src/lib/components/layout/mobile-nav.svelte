<script lang="ts">
  import { Icons } from "$components/icons";
  import MobileLink from "$components/layout/mobile-link.svelte";
  import { Button } from "$components/ui/button";
  import { Sheet, SheetContent, SheetTrigger } from "$components/ui/sheet";
  import { siteConfig } from "$lib/config/site";
  import {
    type NavItemWithOptionalChildren,
    type SidebarNavItem,
  } from "$lib/types/nav";
  import { SidebarOpen } from "lucide-svelte";

  export let sidebarNavItems: SidebarNavItem[] = [];
  export let mainNavItems: NavItemWithOptionalChildren[] = siteConfig.mainNav;
  let open = false;
</script>

<Sheet bind:open>
  <SheetTrigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="ghost"
      class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
    >
      <SidebarOpen class="h-5 w-5" />
      <span class="sr-only">Toggle Menu</span>
    </Button>
  </SheetTrigger>
  <SheetContent side="left" class="pr-0">
    <MobileLink
      href="/"
      class="flex items-center mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
      {open}
    >
      <Icons.logo class="mr-2 h-4 w-4" />
      <span class="font-bold">{siteConfig.name}</span>
    </MobileLink>
    <div class="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 overflow-auto">
      <div class="flex flex-col space-y-3">
        {#each mainNavItems as navItem, index (navItem + index.toString())}
          {#if navItem.href}
            <MobileLink href={navItem.href} bind:open>
              {navItem.title}
            </MobileLink>
          {/if}
        {/each}
      </div>
      <div class="flex flex-col space-y-2">
        {#each sidebarNavItems as navItem, index (index)}
          <div class="flex flex-col space-y-3 pt-6">
            <h4 class="font-medium">{navItem.title}</h4>
            {#if navItem?.items?.length}
              {#each navItem.items as item}
                {#if !item.disabled && item.href}
                  <MobileLink href={item.href} bind:open>
                    {item.title}
                  </MobileLink>
                {/if}
              {/each}
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </SheetContent>
</Sheet>
