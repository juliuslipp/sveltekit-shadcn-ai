<script lang="ts">
  import { page } from "$app/stores";
  import { Icons } from "$lib/components/icons";
  import { Button } from "$lib/components/ui/button";
  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";
  import type { Chat } from "$lib/types/db";
  import { cn } from "$lib/utils";

  export let chat: Chat;

  $: isActive = $page.params.id === chat.id;
</script>

<div class="relative">
  <div class="absolute left-2 top-1 flex h-6 w-6 items-center justify-center">
    {#if chat.sharePath}
      <Tooltip>
        <TooltipTrigger
          tabindex={-1}
          class="focus:bg-muted focus:ring-1 focus:ring-ring"
        >
          <Icons.users class="mr-2" />
        </TooltipTrigger>
        <TooltipContent>This is a shared chat.</TooltipContent>
      </Tooltip>
    {:else}
      <Icons.message class="mr-2" />
    {/if}
  </div>
  <Button
    href={chat.path}
    variant="ghost"
    class={cn("group w-full pl-8 pr-16", isActive && "bg-accent")}
  >
    <div
      class="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
      title={chat.name}
    >
      <span class="whitespace-nowrap">{chat.name}</span>
    </div>
  </Button>
  {#if isActive}
    <div class="absolute right-2 top-1">
      <slot />
    </div>
  {/if}
</div>
