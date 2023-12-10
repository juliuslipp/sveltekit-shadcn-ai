<script lang="ts">
  import { Separator } from "$lib/components/ui/separator";
  import type { UseChatHelpers } from "ai/svelte";

  import ChatMessage from "./chat-message.svelte";

  export let messages: UseChatHelpers["messages"];
</script>

{#if $messages?.length}
  <div class="relative mx-auto max-w-2xl px-4">
    {#each $messages as message, index}
      <div>
        <ChatMessage {message} />
        {#if index < $messages.length - 1}
          <Separator class="my-4 md:my-8" />
        {/if}
      </div>
    {/each}
  </div>
{/if}
