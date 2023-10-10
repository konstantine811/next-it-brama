import { useEffect, useState } from "react";

export function useDelayUnmount(isMounted: boolean, delayTime: number) {
  const [showEl, setShowEl] = useState(false);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isMounted && !showEl) {
      setShowEl(true);
    } else if (!isMounted && showEl) {
      timeoutId = setTimeout(() => {
        setShowEl(false);
      }, delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, showEl]);

  return showEl;
}
