<script lang="ts">
  import { Icons } from "$components/icons";
  import { cn } from "$lib/utils";
  import debounce from "lodash-es/debounce";
  import { clickToCopyAction } from "svelte-legos";
  import { toast } from "svelte-sonner";

  import { buttonVariants } from "./ui/button";

  export let successMessage: string | undefined | null = undefined;

  let copied = false;
  let className: string | undefined | null = undefined;
  export let value = "";
  export { className as class };

  const resetCopied = debounce(() => {
    copied = false;
  }, 3000);

  function handleCopyDone() {
    copied = true;
    resetCopied();

    toast.success(successMessage ?? "Copied to clipboard!");
  }

  function handleCopyError() {
    console.log("Error copying");
    toast.error("An error occurred copying the value. Please try again.");
  }
</script>

<button
  class={cn(buttonVariants({ size: "icon", variant: "ghost" }), className)}
  use:clickToCopyAction={value}
  on:copy-done={handleCopyDone}
  on:copy-error={handleCopyError}
  {...$$restProps}
>
  <span class="sr-only">Copy</span>
  {#if copied}
    <Icons.check class="h-5 w-5" />
  {:else}
    <Icons.copy class="h-5 w-5" />
  {/if}
</button>
