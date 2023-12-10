<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import MainNav from "$components/layout/main-nav.svelte";
  import MobileNav from "$components/layout/mobile-nav.svelte";
  import ThemeToggle from "$components/theme-toggle.svelte";
  import { buttonVariants } from "$components/ui/button";
  import UserMenu from "$components/user-menu.svelte";
  import { siteConfig } from "$lib/config/site";
  import { scrollUtilsStore } from "$lib/stores/scroll-utils-store";
  import { type SidebarNavItem } from "$lib/types/nav";
  import { cn } from "$lib/utils";
  import debounce from "lodash-es/debounce";
  import { windowScrollStore } from "svelte-legos";

  export let sidebarNavItems: SidebarNavItem[] = undefined;
  export let reactiveMenu = false;

  let hideMenu = false;
  const user = $page.data.session?.user;
  const position = windowScrollStore();
  const maxY = 150;
  const scrollUtils = scrollUtilsStore(browser && document.documentElement, {
    global: true,
    offset: 30,
  });

  const setHideMenu = debounce((val: boolean) => {
    hideMenu = val;
  }, 50);

  const handleScrollDown = debounce(() => {
    setHideMenu(true);
  }, 500);

  const handleIdle = debounce(() => {
    setHideMenu(true);
  }, 2000);

  $: {
    if (reactiveMenu) {
      handleIdle.cancel();
      const eligible = $position.y > maxY + 100;
      if ($scrollUtils.scrollsUp) {
        hideMenu = false;
        handleScrollDown.cancel();
      } else if (eligible && $scrollUtils.scrollsDown) {
        handleScrollDown();
      } else if (eligible) {
        handleIdle();
      }
    }
  }

  let startAnimation = false;
  $: {
    reactiveMenu &&
      setTimeout(() => {
        startAnimation = true;
      }, 1000);
  }

  const cancelFadeOut = () => {
    handleIdle.cancel();
    handleScrollDown.cancel();
    setHideMenu.cancel();
  };
</script>

<header
  role="presentation"
  on:focus={cancelFadeOut}
  on:mouseover={cancelFadeOut}
  on:mouseenter={cancelFadeOut}
  class={cn(
    "sticky top-0 z-40 bg-background mx-auto w-full transition-all duration-300",
    !startAnimation && "duration-0",
    !$scrollUtils.atTop &&
      "bg-background/10 backdrop-blur-md border-b from-accent/10 via-50% via-background/20 to-accent/10 bg-gradient-to-r",
    reactiveMenu && {
      "duration-700 top-6 border rounded-3xl w-9/12": !$scrollUtils.atTop,
      "animate-out slide-out-to-top-32 -top-32": hideMenu,
      "slide-in-from-top-16": !hideMenu,
    }
  )}
>
  <div
    class={cn(
      "flex container transition-all h-16 duration-700 max-w-full",
      reactiveMenu && !$scrollUtils.atTop && "h-12 px-4"
    )}
  >
    <MainNav mainNavItems={siteConfig.mainNav} />
    <MobileNav
      mainNavItems={siteConfig.mainNav}
      sidebarNavItems={sidebarNavItems ?? []}
    />

    <nav class="flex items-center ml-auto space-x-2">
      <ThemeToggle />
      {#if user}
        <UserMenu {user} />
      {:else}
        <a
          href="/auth/sign-in"
          class={buttonVariants({
            size: "sm",
          })}
        >
          Sign In
          <span class="sr-only">Sign In</span>
        </a>
      {/if}
    </nav>
  </div>
</header>
