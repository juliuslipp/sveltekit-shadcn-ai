import type { Icons } from "$components/icons";

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
};

export type SidebarNavItem = NavItem & {
  items: SidebarNavItem[];
};

export type NavItemWithChildren = NavItem & {
  items: NavItemWithChildren[];
};

export type NavItemWithOptionalChildren = NavItem | NavItemWithChildren;

export interface FooterItem {
  title: string;
  items: (
    | {
        title: string;
        href: string;
        external?: false;
      }
    | {
        title: string;
        href: string;
        external: true;
      }
  )[];
}
