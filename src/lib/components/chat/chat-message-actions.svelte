<script lang="ts">
  import CopyButton from "$components/copy-button.svelte";
  import { cn } from "$lib/utils";
  import type { Message } from "ai";

  export let message: Message;

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<div
  class={cn(
    "flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0",
    className
  )}
  {...$$restProps}
>
  <CopyButton class="absolute" value={message.content}></CopyButton>
</div>
