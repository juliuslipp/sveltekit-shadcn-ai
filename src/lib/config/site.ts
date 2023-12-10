import {
  type FooterItem,
  type NavItemWithOptionalChildren,
} from "$lib/types/nav";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "svelte-app-starter",
  email: "info@svelte-app-starter.com",
  description: "...",
  url: "https://www.svelte-app-starter.com",
  ogImage: ".../opengraph-image.png",
  afterLogin: "/",
  mainNav: [
    {
      title: "Chat",
      href: "/chat",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ] as NavItemWithOptionalChildren[],
  links: {
    twitter: "https://twitter.com/svelte-app-starter",
    github: "https://github.com/svelte-app-starter",
    discord: "https://discord.com/svelte-app-starter",
  },
  footerNav: [
    {
      title: "Company",
      items: [
        {
          title: "About",
          href: "/about",
        },
        {
          title: "Contact",
          href: "/contact",
        },
        {
          title: "Terms",
          href: "/terms",
        },
        {
          title: "Privacy",
          href: "/privacy",
        },
      ],
    },
    {
      title: "Lofi",
      items: [
        {
          title: "beats to study to",
          href: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
          external: true,
        },
        {
          title: "beats to chill to",
          href: "https://www.youtube.com/watch?v=rUxyKA_-grg",
          external: true,
        },
        {
          title: "a fresh start",
          href: "https://www.youtube.com/watch?v=rwionZbOryo",
          external: true,
        },
        {
          title: "coffee to go",
          href: "https://www.youtube.com/watch?v=2gliGzb2_1I",
          external: true,
        },
      ],
    },
  ] as FooterItem[],
};
