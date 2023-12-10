<script>
  import { page } from "$app/stores";
  import { Heading, Shell } from "$components/layout";
  import { Separator } from "$components/ui/separator";

  const {
    component,
    metadata: { description, title },
  } = $page.data;
</script>

<Shell variant="markdown" as="section">
  <Heading {description} {title} />
  <Separator />
  <svelte:component this={component} />
</Shell>
