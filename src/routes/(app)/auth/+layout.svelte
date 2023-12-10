<script lang="ts">
  import BackButton from "$lib/components/back-button.svelte";
  import { Icons } from "$lib/components/icons";
  import { cn } from "$lib/utils";
</script>

<BackButton variant="ghost" class={cn("absolute left-4 top-10 z-[999]")}>
  <Icons.chevronLeft aria-hidden="true" class="mr-2" />
  Back
</BackButton>

<main class="w-screen h-screen max-h-screen">
  <slot />
</main>
