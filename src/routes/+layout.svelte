<script>
  import { page } from "$app/stores";
  import Cookies from "$components/cookies.svelte";
  import SvelteTheme from "$components/svelte-themes/SvelteTheme.svelte";
  import Toaster from "$components/toaster.svelte";
  import { webVitals } from "$lib/vitals";

  import "../app.postcss";

  import { browser } from "$app/environment";
  import { onNavigate } from "$app/navigation";

  let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;
  onNavigate(({ complete }) => {
    if (!document?.startViewTransition) {
      return;
    }

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await complete;
      });
    });
  });

  $: if (browser && analyticsId) {
    webVitals({
      path: $page.url.pathname,
      params: $page.params,
      analyticsId,
    });
  }
</script>

<slot />

<Cookies class="fixed bottom-6 left-6"></Cookies>
<SvelteTheme
  attribute="class"
  themes={["dark", "light"]}
  defaultTheme="system"
/>
<Toaster />
