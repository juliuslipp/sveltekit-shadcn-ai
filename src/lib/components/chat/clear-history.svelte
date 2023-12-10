<script lang="ts">
  import { goto } from "$app/navigation";
  import { Icons } from "$lib/components/icons";
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "$lib/components/ui/alert-dialog";
  import { Button } from "$lib/components/ui/button";

  let isOpen: boolean;
  let isPending = false;
</script>

<AlertDialog bind:open={isOpen}>
  <AlertDialogTrigger>
    <Button variant="ghost" disabled={isPending}>
      {#if isPending}
        <Icons.spinner class="h-6 w-6 mr-2 animate-spin" />
      {/if}
      Clear history
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete your chat history and remove your data from
        our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
      <AlertDialogAction
        disabled={isPending}
        on:click={(event) => {
          event.preventDefault();

          // TODO: Clear chat history
          isPending = true;
          setTimeout(() => {
            isPending = false;

            isOpen = false;
            goto("/");
          }, 1000);
        }}
      >
        {#if isPending}
          <Icons.spinner class="h-6 w-6 mr-2 animate-spin" />
        {/if}
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
