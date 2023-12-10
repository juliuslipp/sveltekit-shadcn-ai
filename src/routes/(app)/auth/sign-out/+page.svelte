<script lang="ts">
  import { signOut } from "@auth/sveltekit/client";
  import BackButton from "$components/back-button.svelte";
  import { Container, Heading, Shell } from "$components/layout";
  import { Button } from "$components/ui/button";
  import { toast } from "svelte-sonner";

  let loading = false;

  const handleSignOut = async () => {
    loading = true;
    await signOut().catch((error) => {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again later.");
      loading = false;
    });
  };
</script>

<Shell variant="auth" class="max-w-xs ">
  <Container variant="centered">
    <Heading
      title="Sign out"
      description="Are you sure you want to sign out?"
      size="sm"
      class="text-center"
    />

    <div class="flex w-full items-center justify-center space-x-2">
      <Button {loading} on:click={handleSignOut}>Log out</Button>
      <BackButton variant="secondary">Go back</BackButton>
    </div>
  </Container>
</Shell>
