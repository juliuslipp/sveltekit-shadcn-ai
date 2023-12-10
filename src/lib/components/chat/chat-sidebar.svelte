<script>
  import { Icons } from "$lib/components/icons";
  import { Button } from "$lib/components/ui/button";
  import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "$lib/components/ui/sheet";
</script>

<Sheet>
  <SheetTrigger>
    <Button variant="ghost" class="-ml-2 h-9 w-9 p-0">
      <Icons.sidebar class="h-6 w-6" />
      <span class="sr-only">Toggle Sidebar</span>
    </Button>
  </SheetTrigger>
  <SheetContent
    class="inset-y-0 flex h-auto w-[300px] max-w-[300px] flex-col p-0"
  >
    <SheetHeader class="p-4">
      <SheetTitle class="text-sm">Chat History</SheetTitle>
    </SheetHeader>
    <slot />
  </SheetContent>
</Sheet>
