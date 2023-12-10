import type { NavItem, SidebarNavItem } from "$lib/types/nav";

interface DocsConfig {
  mainNav: NavItem[];
  sidebarNav: SidebarNavItem[];
}

type Example = {
  name: string;
  href: string;
  label?: string;
  code: string;
};
export const examples: Example[] = [
  {
    name: "Dashboard",
    href: "/examples/dashboard",
    code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/docs/dashboard",
  },
  {
    name: "Cards",
    href: "/examples/cards",
    code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/examples/cards",
  },
  // {
  // 	name: "Tasks",
  // 	href: "/examples/tasks",
  // 	label: "New",
  // 	code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/apps/www/app/examples/tasks"
  // },
  {
    name: "Playground",
    href: "/examples/playground",
    code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/examples/playground",
  },
  {
    name: "Music",
    href: "/examples/music",
    code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/examples/music",
  },
  {
    name: "Authentication",
    href: "/examples/authentication",
    code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/examples/authentication",
  },
  {
    name: "Forms",
    href: "/examples/forms",
    code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/examples/forms",
  },
];
