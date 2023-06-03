import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { onHoverState } from "@/slices/cursorSlices";

export default function Cursor() {
  const circleSm = useRef<HTMLDivElement>(null);
  const circleLg = useRef<HTMLDivElement>(null);
  const isHover = useSelector(onHoverState);

  useEffect(() => {
    if (isHover) {
      gsap.to(circleLg.current, {
        scale: 2,
        overwrite: true,
        ease: "back.out(1.7)",
        duration: 0.6,
      });
    } else {
      gsap.to(circleLg.current, {
        scale: 1,
        overwrite: true,
        ease: "expo.out",
        duration: 0.4,
      });
    }
  }, [isHover]);
  const circleStyleClass =
    "fixed top-0 left-0 mix-blend-difference z-[1000] bg-white rounded-full";
  const dSm = 8;
  const dLg = 30;

  function getSizeCircle(diameter: number) {
    return {
      width: `${diameter}px`,
      height: `${diameter}px`,
    };
  }

  const onMouseMove = (e: MouseEvent) => {
    gsap.to(circleSm.current, {
      x: e.pageX - dSm / 2,
      y: e.pageY - dSm / 2,
      ease: "expo.out",
      duration: 0.1,
    });

    gsap.to(circleLg.current, {
      x: e.pageX - dLg / 2,
      y: e.pageY - dLg / 2,
      ease: "expo.out",
      duration: 1.5,
    });
  };

  const onHoverEl = (e: boolean) => {
    gsap.to(circleLg.current, {
      scale: 1.2,
      ease: "expo.out",
      duration: 1.5,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  });

  return (
    <div className="pointer-events-none">
      <div
        ref={circleSm}
        style={getSizeCircle(dSm)}
        className={`${circleStyleClass}`}
      ></div>
      <div
        style={getSizeCircle(dLg)}
        ref={circleLg}
        className={`${circleStyleClass}`}
      ></div>
    </div>
  );
}
