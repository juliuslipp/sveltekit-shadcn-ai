<script lang="ts">
  import { page } from "$app/stores";
  import { Icons } from "$lib/components/icons";
  import type { SidebarNavItem } from "$lib/types/nav";
  import { cn } from "$lib/utils";

  export let items: SidebarNavItem[] = [];
</script>

{#if items.length}
  <div class="grid grid-flow-row auto-rows-max text-md">
    {#each items as item, index (index)}
      {#if item.href}
        <a
          key={index}
          href={item.href}
          target={item.external ? "_blank" : ""}
          rel={item.external ? "noreferrer" : ""}
        >
          <span
            class={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
              $page.url.pathname === item.href
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground",
              item.disabled && "pointer-events-none opacity-60"
            )}
          >
            <svelte:component
              this={Icons[item.icon]}
              class="mr-2 h-4 w-4"
              aria-hidden="true"
            />
            <span>{item.title}</span>
          </span>
        </a>
      {:else}
        <span
          class="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
        >
          {item.title}
        </span>
      {/if}
    {/each}
  </div>
{/if}
