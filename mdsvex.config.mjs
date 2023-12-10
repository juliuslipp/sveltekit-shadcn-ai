import path from "path";
import { defineMDSveXConfig as defineConfig } from "mdsvex";

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],
  layout: path.resolve("./src/lib/components/mdsvex/mdsvex.svelte"),
  smartypants: {
    dashes: "oldschool",
  },
  remarkPlugins: [],
  rehypePlugins: [],
});

export default config;
