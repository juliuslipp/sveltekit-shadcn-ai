<script>
  import { page } from "$app/stores";
  import { Container, Shell, SiteFooter, SiteHeader } from "$components/layout";
  import SidebarFooter from "$lib/components/chat/chat-sidebar-footer.svelte";
  import SidebarList from "$lib/components/chat/chat-sidebar-list.svelte";
  import Sidebar from "$lib/components/chat/chat-sidebar.svelte";
  import ClearHistory from "$lib/components/chat/clear-history.svelte";
</script>

<div class="bg-background min-h-full w-full flex flex-col">
  <SiteHeader></SiteHeader>

  <main class="flex-1 w-full">
    <Shell variant="fullScreen" class="p-0 md:p-0">
      <div class="relative w-full h-full pt-16">
        <slot />
      </div>

      <div class="absolute right-8 top-20">
        <Sidebar>
          <SidebarList chats={$page.data.chats} />
          <SidebarFooter>
            <ClearHistory />
          </SidebarFooter>
        </Sidebar>
      </div>
    </Shell>
  </main>
</div>
