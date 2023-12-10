<script lang="ts">
  import { autosizeAction } from "$lib/actions/autosize-action";
  import { Icons } from "$lib/components/icons";
  import { Button } from "$lib/components/ui/button";
  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";
  import type { UseChatHelpers } from "ai/svelte";
  import { createEventDispatcher, tick } from "svelte";

  export let isLoading: UseChatHelpers["isLoading"];
  export let input: UseChatHelpers["input"];

  const dispatch = createEventDispatcher<{ submit: string }>();
  let textarea;

  async function submit(input: string) {
    await dispatch("submit", input);
    textarea.value = "";
    await tick();
    textarea.focus();
  }
  async function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await submit($input);
    }
  }
</script>

<form
  on:submit={async (event) => {
    event.preventDefault();
    if ($input === "") {
      return;
    }
    await submit($input);
  }}
>
  <div
    class="relative flex w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12"
  >
    <Tooltip>
      <TooltipTrigger>
        <Button
          href="/"
          target="_self"
          size="sm"
          variant="outline"
          class="absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4"
        >
          <Icons.plus />
          <span class="sr-only">New Chat</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>New Chat</TooltipContent>
    </Tooltip>

    <textarea
      use:autosizeAction
      tabindex={0}
      rows={1}
      bind:value={$input}
      bind:this={textarea}
      on:keydown={handleKeydown}
      placeholder="Send a message."
      spellcheck="false"
      class="min-h-[60px] max-h-32 md:max-h-48 w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
    ></textarea>

    <div class="absolute right-0 top-4 sm:right-4">
      <Tooltip>
        <TooltipTrigger>
          <Button
            type="submit"
            size="icon"
            disabled={$isLoading || $input === ""}
          >
            <Icons.arrowElbow />
            <span class="sr-only">Send message</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Send message</TooltipContent>
      </Tooltip>
    </div>
  </div>
</form>
