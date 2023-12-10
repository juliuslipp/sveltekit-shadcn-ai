<script lang="ts">
  import { signIn } from "@auth/sveltekit/client";
  import { Icons } from "$lib/components/icons";
  import { Container, Shell } from "$lib/components/layout";
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { toast } from "svelte-sonner";

  let googleLoading = false;
  const handleOauthLogin = async (provider: string) => {
    googleLoading = true;
    await signIn(provider).catch((e) => {
      console.error(e);
      toast.error(
        "An unexpected error occurred while signing in. Please try again."
      );
      googleLoading = false;
    });
  };

  let emailLoading = false;
  const handleEmailSignIn = async (e: Event) => {
    const formData = new FormData(e.target as HTMLFormElement);
    emailLoading = true;
    await signIn("email", {
      email: formData.get("email"),
      redirect: true,
    }).catch((e) => {
      console.error(e);
      toast.error(
        "An unexpected error occurred while signing in. Please try again."
      );
      emailLoading = false;
    });
  };
</script>

<Shell variant="auth">
  <Container variant="centered">
    <Card>
      <CardHeader class="space-y-1 text-center">
        <CardTitle class="text-2xl">Sign into your Account</CardTitle>
        <CardDescription>Choose your preferred sign in method.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <form on:submit|preventDefault={handleEmailSignIn}>
          <div class="grid gap-2">
            <div class="grid gap-1">
              <Label class="sr-only" for="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                required
                autocapitalize="none"
                autocomplete="email"
                autocorrect="off"
                disabled={googleLoading || emailLoading}
              />
            </div>
            <Button
              variant="primary"
              type="submit"
              loading={emailLoading}
              disabled={googleLoading}>Sign In with Email</Button
            >
          </div>
        </form>
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t" />
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          loading={googleLoading}
          disabled={emailLoading}
          on:click={() => handleOauthLogin("google")}
        >
          {#if !googleLoading}
            <Icons.google class="mr-2 h-4 w-4" />
          {/if}
          {" "}
          Google
        </Button>

        <p class="text-center text-sm text-muted-foreground w-3/4 mx-auto">
          By signing in, you agree to our <a
            href="terms"
            class="underline underline-offset-1">Terms of Service</a
          >
          and
          <a href="/privacy" class="underline underline-offset-1"
            >Privacy Policy</a
          >.
        </p>
      </CardContent>

      <CardFooter class="flex flex-wrap items-center space-x-2">
        <div class="flex-1 text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            aria-label="Sign up"
            href="/auth/sign-up"
            class="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Sign up
          </a>
        </div>
      </CardFooter>
    </Card>
  </Container>
</Shell>
