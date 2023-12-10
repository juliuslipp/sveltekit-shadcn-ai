import { tv, type VariantProps } from "tailwind-variants";

export const containerVariants = tv({
  base: "overflow-hidden py-12 md:py-16 [&>*]:mx-auto [&>*]:max-w-xl sm:[&>*]:max-w-2xl md:[&>*]:max-w-3xl lg:[&>*]:max-w-4xl",
  variants: {
    variant: {
      default: "",
      contrast: "bg-accent",
      main: "pt-8 sm:pt-16 lg:pt-20",
      fullScreen: "h-screen -mt-20",
      centered:
        "container flex h-screen w-full max-w-full flex-col justify-center",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type Variant = VariantProps<typeof containerVariants>["variant"];
