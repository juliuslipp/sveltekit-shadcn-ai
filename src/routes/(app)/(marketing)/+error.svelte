<script lang="ts">
  import ErrorCard from "$components/error-card.svelte";
  import { Container, Shell } from "$components/layout";
</script>

<Shell variant="fullScreen">
  <Container variant="centered">
    <ErrorCard
      icon="warning"
      title="Page not found"
      description="The page you are looking for does not exist"
      retryLink="/"
      retryLinkText="Go to Home"
    />
  </Container>
</Shell>
