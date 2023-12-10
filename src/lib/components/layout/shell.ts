import { tv, type VariantProps } from "tailwind-variants";

export const shellVariants = tv({
  base: "grid items-center gap-8 w-full p-4 md:p-8",
  variants: {
    variant: {
      default: "",
      container: "container",
      page: "px-0 md:px-0",
      auth: "container max-w-lg p-0 lg:p-0 max-h-full",
      fullScreen: "h-screen -mt-16",
      markdown: "container max-w-3xl p-8 md:p-10 lg:p-10 gap-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type Variant = VariantProps<typeof shellVariants>["variant"];
