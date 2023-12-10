<script lang="ts">
  import { cn } from "$lib/utils";

  import { shellVariants, type Variant } from "./shell";

  let className: string | undefined | null = undefined;
  export let as: string = "div";
  export let variant: Variant = "default";
  export { className as class };
</script>

<svelte:element
  this={as}
  class={cn(shellVariants({ variant, className }))}
  {...$$restProps}
>
  <slot />
</svelte:element>
