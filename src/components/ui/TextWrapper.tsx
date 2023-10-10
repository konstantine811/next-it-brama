import { ElementType, HTMLAttributes, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/merge-classes-utils";

export const paragraphVariants = cva(
  "max-w-prose dark:text-slate-200 text-slate-700 text-center",
  {
    variants: {
      size: {
        default: "text-base sm:text-lg",
        "p-sm": "text-sm, sm:text-base",
        h1: "text-4xl md:text-5xl lg:text-6xl",
        h2: "text-3xl md:text-4xl lg:text-5xl",
        h3: "text-2xl md:text-3xl lg:text-3xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface TextWrapperProps
  extends HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
  as?: ElementType;
}

const TextWrapper = forwardRef<
  HTMLHeadingElement | HTMLParagraphElement,
  TextWrapperProps
>(({ as: Tag = "p", className, size, children, ...props }, ref) => {
  return (
    <Tag
      ref={ref}
      {...props}
      className={`${cn(paragraphVariants({ size, className }))}`}
    >
      {children}
    </Tag>
  );
});

TextWrapper.displayName = "TextWrapper";

export default TextWrapper;
