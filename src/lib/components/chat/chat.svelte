<script lang="ts">
  import { cn } from "$lib/utils";
  import { useChat, type Message } from "ai/svelte";
  import { toast } from "svelte-sonner";

  import ChatList from "./chat-list.svelte";
  import ChatPanel from "./chat-panel.svelte";
  import EmptyScreen from "./empty-screen.svelte";

  export let id: string | undefined = undefined;
  export let initialMessages: Message[] | undefined = undefined;
  let className: string | undefined | null = undefined;
  export { className as class };

  const { messages, append, reload, stop, isLoading, input } = useChat({
    initialMessages,
    id,
    body: {
      id,
    },
    onError: (err) => {
      console.error(err);
      toast.error("An unexpected error occurred. Please try again later.", {
        description: err.message,
      });
    },
  });
</script>

<div class={cn("pb-[200px] pt-4 md:pt-10", className)}>
  {#if $messages.length}
    <ChatList {messages} />
  {:else}
    <EmptyScreen {input} />
  {/if}
</div>

<ChatPanel {id} {isLoading} {stop} {append} {reload} {messages} {input} />
