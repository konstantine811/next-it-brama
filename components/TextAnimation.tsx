import {
  ComponentType,
  ElementType,
  FC,
  HTMLAttributes,
  useEffect,
} from "react";
import TextWrap, { paragraphVariants } from "@/components/ui/TextWrapper";
import gsap from "gsap";
import { VariantProps } from "class-variance-authority";

interface ITextSplitProps
  extends HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
  children: string;
  isWordSplit?: boolean;
  uniqKey?: string;
  as?: ElementType;
}

const TextSplitAnimation: FC<ITextSplitProps> = ({
  children,
  as,
  className,
  size,
  uniqKey = "_",
  isWordSplit = false,
}) => {
  const classAnim = `txt-anim_${as}_${uniqKey}`;
  function fadeText() {
    gsap.fromTo(
      `.${classAnim}`,
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        stagger: isWordSplit ? 0.2 : 0.0031,
        duration: 2,
        overwrite: true,
        ease: "ease",
      }
    );
  }

  useEffect(() => {
    fadeText();
  });
  {
    return (
      <TextWrap as={as} className={className} size={size}>
        {children.split(" ").map((word, wordIndex) => {
          return (
            <span
              aria-hidden="false"
              className={`${classAnim} opacity-0 inline-block whitespace-nowrap mr-[0.25em]`}
              key={wordIndex}
            >
              {isWordSplit
                ? word
                : word.split("").map((letter, letterIndex) => {
                    return (
                      <span
                        aria-hidden="true"
                        key={letterIndex}
                        className={`${classAnim} inline-block`}
                      >
                        {letter}
                      </span>
                    );
                  })}
            </span>
          );
        })}
      </TextWrap>
    );
  }
};

export default TextSplitAnimation;
