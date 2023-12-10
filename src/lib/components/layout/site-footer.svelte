<script lang="ts">
  import ExternalLink from "$lib/components/external-link.svelte";
  import { Icons } from "$lib/components/icons";
  import { Shell } from "$lib/components/layout";
  import { buttonVariants } from "$lib/components/ui/button";
  import { siteConfig } from "$lib/config/site";
</script>

<div class="w-full border-t bg-background">
  <Shell
    as="footer"
    id="footer-content"
    variant="container"
    aria-labelledby="footer-content-heading"
    class="flex flex-col items-stretch gap-10 lg:flex-row lg:gap-20"
  >
    <section
      id="footer-branding"
      aria-labelledby="footer-branding-heading"
      class="mb-auto flex flex-col gap-2"
    >
      <a href="/" class="flex w-fit items-center space-x-2">
        <Icons.logo class="h-6 w-6" aria-hidden="true" />
        <span class="font-bold">{siteConfig.name}</span>
        <span class="sr-only">Home</span>
      </a>
    </section>
    <section
      id="footer-links"
      aria-labelledby="footer-links-heading"
      class="xxs:grid-cols-2 grid flex-1 grid-cols-1 gap-10 sm:grid-cols-4"
    >
      {#each siteConfig.footerNav as item}
        <div class="space-y-3">
          <h4 class="text-base font-medium">{item.title}</h4>
          <ul class="space-y-3">
            {#each item.items as link}
              <li>
                {#if link.external}
                  <ExternalLink
                    class="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    href={link.href ?? "#"}
                  >
                    {link.title}
                    <span class="sr-only">{link.title}</span>
                  </ExternalLink>
                {:else}
                  <a
                    href={link.href ?? "#"}
                    class="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.title}
                    <span class="sr-only">{link.title}</span>
                  </a>
                {/if}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </section>

    <section class="flex flex-col gap-2">
      <div></div>

      <div class="ml-auto mt-auto flex gap-1">
        <a
          href={`mailto:${siteConfig.email}`}
          class={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Icons.mail />
        </a>

        <a
          href={siteConfig.links.twitter}
          target="_blank"
          class={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Icons.twitter />
        </a>

        <a
          href={siteConfig.links.discord}
          target="_blank"
          class={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Icons.discord />
        </a>
      </div>
    </section>
  </Shell>
</div>
