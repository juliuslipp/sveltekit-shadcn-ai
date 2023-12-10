import { tv, type VariantProps } from "tailwind-variants";

export const headingVariants = tv({
  base: "text-3xl font-bold tracking-tight",
  variants: {
    variant: {
      default: "",
      contrast: "bg-accent",
      main: "pt-8 sm:pt-16 lg:pt-20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type Variant = VariantProps<typeof headingVariants>["variant"];
