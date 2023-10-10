import { useState } from "react";
import { useDelayUnmount } from "src/hooks/ConditionRenderAnimatin";
import { cn } from "@lib/merge-classes-utils";

const mountedStyle = { animation: "inAnimation 250ms ease-in" };
const unmountedStyle = {
  animation: "outAnimation 270ms ease-out forwards",
};

const ConditionRenderAnimation = () => {
  const [isMounted, setIsMounted] = useState(true);
  const showDiv = useDelayUnmount(isMounted, 250);
  return (
    <>
      <button
        className={`${cn("border p-2 text-white rounded-md")}`}
        onClick={() => {
          setIsMounted(!isMounted);
        }}
      >
        Show/Hide
      </button>
      {showDiv && (
        <div
          className={`${cn("bg-red-700 w-[200px] h-[100px] mx-auto")}`}
          style={isMounted ? mountedStyle : unmountedStyle}
        ></div>
      )}
    </>
  );
};

export default ConditionRenderAnimation;
