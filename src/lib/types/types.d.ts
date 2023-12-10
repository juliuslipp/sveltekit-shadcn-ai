import type { ComponentType } from "svelte";
import type { ExternalToast } from "svelte-sonner/dist/types";

declare module "svelte-sonner/dist/types" {
  type PromiseDataOR<ToastData = unknown> = ExternalToast & {
    loading?: string | ComponentType;
    success?:
      | string
      | ComponentType
      | ((data: ToastData) => ComponentType | string);
    info?:
      | string
      | ComponentType
      | ((data: ToastData) => ComponentType | string);
    warning?:
      | string
      | ComponentType
      | ((data: ToastData) => ComponentType | string);
    error?:
      | string
      | ComponentType
      | ((error: unknown) => ComponentType | string);
  };
}
