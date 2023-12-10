<script lang="ts">
  import { Button } from "$components/ui/button";
  import { Label } from "$components/ui/label";
  import { Switch } from "$components/ui/switch";
  import { cookiesStore } from "$lib/stores/cookies-store";
  import { cn } from "$lib/utils";

  const onSave = () => {
    $cookiesStore.saved = true;
  };

  let className = "";
  export { className as class };
</script>

{#if !$cookiesStore.saved}
  <div
    class={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-lg",
      className
    )}
    {...$$restProps}
  >
    <div
      class="flex flex-col space-y-1.5 p-6 border-b border-dark-gray-300 pb-4"
    >
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class=" mr-2"
          ><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"
          ></path><path d="M8.5 8.5v.01"></path><path d="M16 15.5v.01"
          ></path><path d="M12 12v.01"></path><path d="M11 17v.01"></path><path
            d="M7 14v.01"
          ></path></svg
        >
        <h3 class="text-2xl font-semibold leading-none tracking-tight">
          Cookie Preferences
        </h3>
      </div>
      <p class="text-sm text-muted-foreground">
        Manage your cookie settings. You can enable or disable different types
        of cookies below.
      </p>
    </div>
    <div class="p-6 space-y-4 pt-4">
      <div class="flex justify-between items-start space-y-2">
        <div>
          <Label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="essential"
          >
            Essential Cookies
          </Label>
          <p class="text-dark-gray-500 text-sm">
            These cookies are necessary for the website to function and cannot
            be switched off.
          </p>
        </div>
        <Switch class="ml-auto" id="essential" disabled checked />
      </div>
      <div class="flex justify-between items-start space-y-2">
        <div>
          <Label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="analytics"
          >
            Analytics Cookies
          </Label>
          <p class="text-dark-gray-500 text-sm">
            These cookies allow us to count visits and traffic sources, so we
            can measure and improve the performance of our site.
          </p>
        </div>
        <Switch
          class="ml-auto"
          id="analytics"
          bind:checked={$cookiesStore.analytics}
        />
      </div>
      <div class="flex justify-between items-start space-y-2">
        <div>
          <Label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="marketing"
          >
            Marketing Cookies
          </Label>
          <p class="text-dark-gray-500 text-sm">
            These cookies help us show you relevant ads.
          </p>
        </div>
        <Switch
          class="ml-auto"
          id="marketing"
          bind:checked={$cookiesStore.marketing}
        />
      </div>
    </div>
    <div class="border-t border-dark-gray-300 mt-4"></div>
    <div class="flex items-center p-6">
      <Button
        class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ml-auto"
        type="submit"
        on:click={onSave}
      >
        Save Preferences
      </Button>
    </div>
  </div>
{/if}
