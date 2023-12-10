import { storage } from "svelte-legos";
import { writable } from "svelte/store";

export const cookiesStore = storage(
  writable({
    analytics: false,
    marketing: false,
    saved: true,
  }),
  "cookie-preferences"
);
