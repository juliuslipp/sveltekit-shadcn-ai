<script lang="ts">
  import { Icons } from "$components/icons";
  import { Container, Shell } from "$components/layout";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$components/ui/card";
  import { siteConfig } from "$lib/config/site";
</script>

<Shell variant="auth">
  <Container variant="centered">
    <Card>
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl">
          Join {siteConfig.name}
        </CardTitle>
        <CardDescription>
          {siteConfig.description}
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">TODO</CardContent>

      <CardFooter class="grid gap-4">
        <div class="text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            aria-label="Sign in"
            href="/auth/sign-in"
            class="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Sign in
          </a>
        </div>
      </CardFooter>
    </Card>
  </Container>
</Shell>
