import { FC, ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

interface IFadeInElementProps {
  children: ReactNode;
  className?: string;
}

const FadeInElement: FC<IFadeInElementProps> = ({ children, className }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  function fadeText() {
    gsap.fromTo(
      wrapRef.current,
      {
        opacity: 0,
        y: 7,
        scale: 0.99,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
        duration: 1.5,
        ease: "expo.out",
      }
    );
  }

  useEffect(() => {
    fadeText();
  });
  return (
    <div ref={wrapRef} className={className}>
      {children}
    </div>
  );
};

export default FadeInElement;
