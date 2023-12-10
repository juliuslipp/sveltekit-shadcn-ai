<script lang="ts">
  import { Icons } from "$lib/components/icons";
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";

  let className: string | undefined | null = undefined;
  export { className as class };

  let isAtBottom = false;
  function handleScroll() {
    isAtBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;
  }
</script>

<svelte:window on:scroll={handleScroll} />

<Button
  variant="outline"
  size="icon"
  class={cn(
    "transition-opacity",
    isAtBottom ? "opacity-0" : "opacity-100",
    className
  )}
  on:click={() =>
    window.scrollTo({
      top: document.body.offsetHeight,
      behavior: "smooth",
    })}
  {...$$restProps}
>
  <Icons.arrowDown class="w-5 h-5" />
  <span class="sr-only">Scroll to bottom</span>
</Button>
