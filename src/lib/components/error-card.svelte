<script lang="ts">
  import { Icons } from "$components/icons";
  import { buttonVariants } from "$components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$components/ui/card";
  import { cn } from "$lib/utils";

  export let icon: keyof Icons = "warning";
  export let title: string;
  export let description: string;
  export let retryLink: string | undefined = undefined;
  export let retryLinkText: string | undefined = undefined;
  export let errorMessage: string | undefined = undefined;
  let className: string | undefined;
  export { className as class };
</script>

<Card class={cn("grid place-items-center", className)} {...$$restProps}>
  <CardHeader class="pb-0">
    <div class="grid h-20 w-20 place-items-center rounded-full bg-muted">
      <svelte:component
        this={Icons[icon]}
        class="h-10 w-10"
        aria-hidden="true"
      />
    </div>
  </CardHeader>
  <CardContent
    class="flex min-h-[176px] flex-col items-center justify-center space-y-2 text-center"
  >
    <CardTitle class="text-2xl">{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
    {#if errorMessage}
      <p class="text-destructive-foreground">{errorMessage}</p>
    {/if}
  </CardContent>
  {#if retryLink}
    <CardFooter>
      <a href={retryLink}>
        <div
          class={cn(
            buttonVariants({
              variant: "ghost",
            })
          )}
        >
          {retryLinkText}
          <span class="sr-only">{retryLinkText}</span>
        </div>
      </a>
    </CardFooter>
  {/if}
</Card>
