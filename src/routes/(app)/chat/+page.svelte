<script lang="ts">
  import Chat from "$lib/components/chat/chat.svelte";

  import type { PageServerData } from "./$types";

  export let data: PageServerData;
  const { chat } = data;
</script>

<Chat id={chat.id} initialMessages={chat.messages} />
