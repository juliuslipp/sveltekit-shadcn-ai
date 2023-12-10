<script lang="ts">
  import { page } from "$app/stores";
  import { Icons } from "$lib/components/icons";
  import UserAvatar from "$lib/components/user-avatar.svelte";
  import { cn } from "$lib/utils";
  import type { Message } from "ai";

  import ChatMessageActions from "./chat-message-actions.svelte";

  export let message: Message;
  const user = $page.data.session?.user;
</script>

<div
  class={cn("group relative mb-4 flex items-start md:-ml-12")}
  {...$$restProps}
>
  <div
    class={cn(
      "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
      message.role === "user"
        ? "bg-background"
        : "bg-primary text-primary-foreground"
    )}
  >
    {#if message.role === "user"}
      <UserAvatar user={user ?? {}} />
    {:else}
      <Icons.ai />
    {/if}
  </div>
  <div class="ml-4 flex-1 space-y-2 overflow-hidden px-1">
    {message.content}
  </div>
  <ChatMessageActions {message} />
</div>
