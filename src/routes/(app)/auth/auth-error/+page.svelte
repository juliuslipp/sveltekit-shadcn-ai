<script lang="ts">
  import ErrorCard from "$components/error-card.svelte";
  import { Container, Shell } from "$components/layout";
  import { onMount } from "svelte";

  let error: string | null = null;
  onMount(() => {
    const searchParams = new URLSearchParams(window.location.search);
    error = searchParams.get("error");
  });
</script>

<Shell variant="auth">
  <Container variant="centered">
    <ErrorCard title="Authentication Error" description={error} />
  </Container>
</Shell>
