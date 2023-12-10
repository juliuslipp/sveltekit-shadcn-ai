<script lang="ts">
  import { Icons } from "$lib/components/icons";
  import { Button } from "$lib/components/ui/button";
  import type { UseChatHelpers } from "ai/svelte";

  import ButtonScrollToBottom from "./button-scroll-to-bottom.svelte";
  import FooterText from "./footer-text.svelte";
  import PromptForm from "./prompt-form.svelte";

  export let id: string | undefined = undefined;
  export let isLoading: UseChatHelpers["isLoading"];
  export let stop: UseChatHelpers["stop"];
  export let append: UseChatHelpers["append"];
  export let reload: UseChatHelpers["reload"];
  export let messages: UseChatHelpers["messages"];
  export let input: UseChatHelpers["input"];
</script>

<div
  class="absolute inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%"
>
  <div class="mx-auto sm:max-w-2xl sm:px-4">
    <div class="flex h-10 items-center justify-center gap-2 mb-2">
      {#if $isLoading}
        <Button variant="outline" on:click={() => stop()} class="bg-background">
          <Icons.stop class="mr-2 w-5 h-5" />
          Stop generating
        </Button>
      {:else if $messages?.length > 0}
        <Button
          variant="outline"
          on:click={() => reload()}
          class="bg-background"
        >
          <Icons.refresh class="mr-2 w-5 h-5" />
          Regenerate response
        </Button>
      {/if}

      {#if $messages?.length > 0}
        <ButtonScrollToBottom />
      {/if}
    </div>
    <div
      class="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4"
    >
      <PromptForm
        on:submit={async (event) => {
          await append({
            id,
            content: event.detail,
            role: "user",
          });
        }}
        {input}
        {isLoading}
      />
      <FooterText class="hidden sm:block" />
    </div>
  </div>
</div>
