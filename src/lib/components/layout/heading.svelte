<script lang="ts">
  import { cn } from "$lib/utils";

  // import { headingVariants, type Variant } from "./heading";

  let className: string | undefined | null = undefined;
  // export let variant: Variant = "default";
  export let title: string;
  export let description: string | undefined = undefined;
  export let descriptionClassName: string | undefined = undefined;
  export let size: "default" | "large" = "default";
  export { className as class };
</script>

<div class={cn("grid gap-1", className)} {...$$props}>
  <h2
    class={cn(
      "line-clamp-1 text-3xl font-bold tracking-tight",
      size === "default" && "md:text-4xl"
    )}
  >
    {title}
  </h2>
  {#if description}
    <p
      class={cn(
        "line-clamp-2 text-muted-foreground",
        size === "default" && "text-lg",
        descriptionClassName
      )}
    >
      {description}
    </p>
  {/if}
</div>
