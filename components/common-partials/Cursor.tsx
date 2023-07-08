import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  onHoverState,
  onSizeHoverState,
  onCenterHoverState,
} from "@/slices/cursorSlices";

export default function Cursor() {
  const circleSm = useRef<HTMLDivElement>(null);
  const circleLg = useRef<HTMLDivElement>(null);
  const isHover = useSelector(onHoverState);
  const onSizeHover = useSelector(onSizeHoverState);
  const onCenterHover = useSelector(onCenterHoverState);

  useEffect(() => {
    if (isHover) {
      gsap.to(circleLg.current, {
        scale: 2,
        overwrite: true,
        ease: "back.out(1.8)",
        duration: 0.6,
        width: getWidthCircle(onSizeHover),
        height: dLgHover,
      });
    } else {
      gsap.to(circleLg.current, {
        scale: 1,
        overwrite: true,
        ease: "expo.out",
        duration: 0.4,
        ...getSizeCircle(dLg),
      });
    }
  }, [isHover, onSizeHover, onCenterHover]);
  const circleStyleClass =
    "fixed top-0 left-0 mix-blend-difference z-[1000] bg-white rounded-full";
  const dSm = 8;
  const dLg = 9;
  const dLgHover = 20;

  function getWidthCircle(width: number) {
    return width / 2;
  }

  function getSizeCircle(diameter: number) {
    return {
      width: `${diameter}px`,
      height: `${diameter}px`,
    };
  }

  const onMouseMove = (e: MouseEvent) => {
    gsap.to(circleSm.current, {
      x: e.clientX - dSm / 2,
      y: e.clientY - dSm / 2,
      ease: "expo.out",
      duration: 0.1,
    });

    if (isHover) {
      gsap.to(circleLg.current, {
        x: onCenterHover - getWidthCircle(onSizeHover) / 2,
        y: e.clientY - dLgHover / 2,
        ease: "expo.out",
        duration: 1.5,
      });
    } else {
      gsap.to(circleLg.current, {
        x: e.clientX - dLg / 2,
        y: e.clientY - dLg / 2,
        ease: "expo.out",
        duration: 1.5,
      });
    }
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
