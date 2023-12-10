<script lang="ts">
  import { Container, Shell } from "$lib/components/layout";
  import { Card } from "$lib/components/ui/card";
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<Shell variant="fullScreen">
  <Container variant="centered" class="relative text-center">
    <Card class="p-4 shadow-2xl shadow-orange-600/50">
      <h1 class="text-4xl text-primary pb-4 font-bold">svelte-app-starter</h1>
      <p class="text-primary">The ultimate sveltekit start-up starter</p>
    </Card>
  </Container>
</Shell>

<Shell variant="page">
  <Container variant="contrast"><div>Marketing 1</div></Container>
  <Container variant=""><div>Marketing 2</div></Container>
</Shell>
