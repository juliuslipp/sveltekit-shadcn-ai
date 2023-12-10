<script lang="ts">
  import { Icons } from "$components/icons";
  import themeStore, { setTheme } from "$components/svelte-themes";
  import { buttonVariants } from "$components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "$components/ui/dropdown-menu";
  import { cn } from "$lib/utils";
</script>

<DropdownMenu {...$$restProps}>
  <DropdownMenuTrigger
    class={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-8 w-8 px-0")}
  >
    <Icons.sun
      class="dark:hidden rotate-0 text-primary scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Icons.moon
      class="absolute rotate-90 dark:text-primary scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end">
    <DropdownMenuItem
      on:click={() => {
        setTheme("light");
      }}
    >
      <Icons.sun class="mr-2 h-4 w-4" />
      <span class={$themeStore.theme === "light" && "underline "}>Light</span>
    </DropdownMenuItem>
    <DropdownMenuItem
      on:click={() => {
        setTheme("dark");
      }}
    >
      <Icons.moon class="mr-2 h-4 w-4" />
      <span class={$themeStore.theme === "dark" && "underline"}>Dark</span>
    </DropdownMenuItem>
    <DropdownMenuItem
      on:click={() => {
        setTheme("system");
      }}
    >
      <Icons.laptop class="mr-2 h-4 w-4" />
      <span class={$themeStore.theme === "system" && "underline"}>System</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
