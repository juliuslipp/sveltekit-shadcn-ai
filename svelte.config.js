import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/kit/vite";
import { mdsvex } from "mdsvex";

import mdsvexConfig from "./mdsvex.config.mjs";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...(mdsvexConfig.extensions ?? [])],
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess({}), mdsvex(mdsvexConfig)],
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      $components: "./src/lib/components",
      $lib: "./src/lib",
      $db: "./src/db",
      $server: "./src/server",
      $content: "./src/content",
    },
  },
};

export default config;
