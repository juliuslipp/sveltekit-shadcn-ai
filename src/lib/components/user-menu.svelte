<script lang="ts">
  import type { User } from "@auth/core/types";
  import { Icons } from "$components/icons";
  import { buttonVariants } from "$components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "$components/ui/dropdown-menu";
  import UserAvatar from "$components/user-avatar.svelte";
  import { cn } from "$lib/utils";

  export let user: User;
</script>

<DropdownMenu {...$$restProps}>
  <DropdownMenuTrigger
    class={cn(
      buttonVariants({ variant: "ghost" }),
      "relative h-8 w-8 rounded-full"
    )}
  >
    <UserAvatar {user} />
  </DropdownMenuTrigger>

  <DropdownMenuContent class="w-56">
    <DropdownMenuLabel class="font-normal">
      <div class="flex flex-col space-y-1">
        <p class="text-sm font-medium leading-none">
          {user.name ? user.name : user.email}
        </p>
        {#if user.name}
          <p class="text-xs leading-none text-muted-foreground">
            {user.email}
          </p>
        {/if}
      </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <!--      <DropdownMenuItem asChild>-->
      <!--        <a-->
      <!--          href="/dashboard/api-keys"-->
      <!--          class={cn(-->
      <!--            buttonVariants({ variant: "ghost" }),-->
      <!--            "px-2 py-1.5 w-full justify-start text-primary"-->
      <!--          )}-->
      <!--        >-->
      <!--          <Icons.key class="mr-2 h-4 w-4" aria-hidden="true" />-->
      <!--          View API Keys-->
      <!--        </a>-->
      <!--      </DropdownMenuItem>-->
      <DropdownMenuItem asChild>
        <a
          href="/dashboard/account"
          class={cn(
            buttonVariants({ variant: "ghost" }),
            "px-2 py-1.5 w-full justify-start text-primary"
          )}
        >
          <Icons.user class="mr-2 h-4 w-4" aria-hidden="true" />
          Account
        </a>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem asChild>
      <a
        href="/auth/sign-out"
        class={cn(
          buttonVariants({ variant: "ghost" }),
          "px-2 py-1.5 w-full justify-start text-primary"
        )}
      >
        <Icons.logout class="mr-2 h-4 w-4" aria-hidden="true" />
        Log out
      </a>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
