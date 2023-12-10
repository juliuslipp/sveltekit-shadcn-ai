<script lang="ts">
  import type { User } from "@auth/core/types";
  import { Icons } from "$components/icons";
  import { Avatar, AvatarFallback, AvatarImage } from "$components/ui/avatar";

  const getInitialsFromName = (name?: string | null): string | undefined => {
    if (!name || !name.trim()) {
      return undefined;
    }

    const splitName = name.trim().split(" ");

    if (splitName.length > 1) {
      return `${splitName[0]?.charAt(0) || ""}${splitName[1]?.charAt(0) || ""}`;
    }

    return splitName[0]?.slice(0, 2) || "";
  };
  export let user: User;
  $: initials = getInitialsFromName(user.name);
</script>

<Avatar class="h-8 w-8">
  <AvatarImage src={user.image ?? undefined} alt={user.email ?? ""} />
  <AvatarFallback>
    {#if initials}
      {initials}
    {:else if user.email}
      {user.email?.slice(0, 1)}
    {:else}
      <Icons.user></Icons.user>
    {/if}
  </AvatarFallback>
</Avatar>
