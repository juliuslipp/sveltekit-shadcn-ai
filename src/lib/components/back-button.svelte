<script lang="ts">
  import { Button } from "$lib/components/ui/button";

  const conditionallyNavigateBack = () => {
    const referrer = document?.referrer;
    const siteURL = window?.location?.origin;

    if (referrer && referrer.indexOf(siteURL) === 0) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };
</script>

<Button on:click={conditionallyNavigateBack} {...$$restProps}>
  <slot />
</Button>
