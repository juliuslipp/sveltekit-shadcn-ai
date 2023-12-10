<script lang="ts">
  import { Separator } from "$lib/components/ui/separator";
  import type { SidebarNavItem } from "$lib/types/nav";
  import { cn } from "$lib/utils";

  import DocsSidebarNavItems from "./sidebar-nav-items.svelte";

  export let items: SidebarNavItem[] = [];
</script>

<div class="flex h-full w-full overflow-auto">
  {#if items.length}
    <div class="w-full min-h-full py-6 pr-4">
      {#each items as item, index (index)}
        {#if item.children}
          <div class={cn("pb-4")}>
            {#if item.href}
              <a href={item.href}>
                <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                  {item.title}
                </h4>
              </a>
            {:else}
              <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                {item.title}
              </h4>
            {/if}

            {#if item?.items}
              {#if item?.items?.length}
                <DocsSidebarNavItems items={item.items} />
              {/if}
            {/if}
          </div>
        {:else}
          <DocsSidebarNavItems items={[item]} />
        {/if}
      {/each}
    </div>
  {/if}

  <Separator orientation="vertical" class="h-full" />
</div>
