import { useDelayUnmount } from "@/hooks/ConditionRenderAnimatin";
import { useState } from "react";

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
        className="border p-2 text-white rounded-md"
        onClick={() => {
          setIsMounted(!isMounted);
        }}
      >
        Show/Hide
      </button>
      {showDiv && (
        <div
          className="transitionDiv"
          style={isMounted ? mountedStyle : unmountedStyle}
        ></div>
      )}
    </>
  );
};

export default ConditionRenderAnimation;
