import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Loading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleState = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleState);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  });
  return (
    <div className="grow-1 bg-black w-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="preloader-2">
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
          <span className="line line-4"></span>
          <span className="line line-5"></span>
          <span className="line line-6"></span>
          <span className="line line-7"></span>
          <span className="line line-8"></span>
          <span className="line line-9"></span>
        </div>
        <div className="uppercase">Loading</div>
      </div>
    </div>
  );
};

export default Loading;
