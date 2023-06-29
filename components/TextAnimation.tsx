import { useEffect } from "react";
import gsap from "gsap";
import { NextPage } from "next";

interface ITextSplitProps {
  children: string;
  isWordSplit?: boolean;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

const TextSplitAnimation: NextPage<ITextSplitProps> = ({
  children,
  tag,
  className,
  isWordSplit = false,
}) => {
  const Tag = tag || "h1";
  const classAnim = "txt-anim";
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
        stagger: isWordSplit ? 0.2 : 0.031,
        duration: 1.5,
        ease: "ease",
      }
    );
  }

  useEffect(() => {
    fadeText();
  });
  return (
    <Tag className={`${className} text-white`}>
      {children.split(" ").map((word, wordIndex) => {
        return (
          <span
            aria-hidden="false"
            className={`${classAnim} inline-block whitespace-nowrap mr-[0.25em]`}
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
    </Tag>
  );
};

export default TextSplitAnimation;
