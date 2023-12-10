import { error } from "@sveltejs/kit";
import { pathToSlug } from "$lib/utils";
import type { SvelteComponent } from "svelte";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const modules = import.meta.glob(`../../../../content/pages/*.svelte.md`);

export const prerender = true;

interface SitePage {
  default: SvelteComponent;
  metadata: {
    title: string;
    description: string;
  };
}

const mappedModules = Promise.all(
  Object.entries(modules).map(
    async ([path, importModule]: [string, () => Promise<SitePage>]) => {
      const module = await importModule();
      return {
        slug: pathToSlug(path),
        metadata: module.metadata,
        component: module.default,
      };
    }
  )
);
export async function load(event) {
  const module = (await mappedModules).find(
    (module) => module.slug === event.params.slug
  );
  if (!module) {
    throw error(404);
  }

  return module;
}

export async function entries() {
  const modules = await mappedModules;
  return modules.map((module) => ({
    slug: module.slug,
  }));
}
