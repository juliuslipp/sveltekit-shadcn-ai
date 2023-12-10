<script lang="ts">
  import themeStore from "$components/svelte-themes";
  import { Toaster } from "svelte-sonner";
</script>

<Toaster
  position="bottom-right"
  theme={$themeStore.resolvedTheme}
  toastOptions={{}}
  closeButton
  richColors
/>
