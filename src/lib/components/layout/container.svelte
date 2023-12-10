<script lang="ts">
  import { cn } from "$lib/utils";

  import { containerVariants, type Variant } from "./container";

  let className: string | undefined | null = undefined;
  export let as: string = "section";
  export let variant: Variant = "default";
  export { className as class };
</script>

<svelte:element
  this={as}
  class={cn(containerVariants({ variant, className }))}
  {...$$restProps}
>
  <slot />
</svelte:element>
