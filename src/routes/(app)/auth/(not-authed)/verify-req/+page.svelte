<script lang="ts">
  import { Container, Heading, Shell } from "$components/layout";
</script>

<Shell variant="auth" className="max-w-xl">
  <Container variant="centered">
    <Heading
      title="Check your Inbox!"
      size="sm"
      description="A verification email has been sent to your email address. Please check
        your inbox and click on the link provided. Make sure to also check your
        spam folder. Just in case."
      className="text-center"
      descriptionClassName="line-clamp-10"
    />
  </Container>
</Shell>
