import type { AppProps } from "next/app";
// styles
import "../styles/global.scss";
import "react-creative-cursor/dist/styles.css";
// libs
import { AnimatePresence, motion } from "framer-motion";
// store
import { store } from "@store/slices/index.store";
import { Provider } from "react-redux";
// next auth
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
// 1. Import `createTheme`
import { ThemeProvider as NextThemesProvider } from "next-themes";

import React from "react";
import { Suspense } from "react";
// components
// import Cursor from "../components/common-partials/Cursor";
import { Cursor } from "react-creative-cursor";
import Loading from "@components/Loading";
import Layout from "@components/Layout";
import { useRouter } from "next/router";
import { cn } from "@/src/lib/merge-classes-utils";
React.useLayoutEffect = React.useEffect;

// 2. Call `createTheme` and pass your custom values
export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const router = useRouter();
  const overlapTransitionClass =
    "absolute top-0 left-0 z-[100000] w-full h-screen bg-black flex";

  return (
    <NextThemesProvider defaultTheme="system" attribute="class" enableSystem>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Cursor
            cursorSize={8}
            isGelly={true}
            cursorBackgrounColor={"#ffffff"}
          />
          <div className="min-h-screen flex flex-col justify-between">
            <Layout>
              <AnimatePresence>
                <motion.main
                  key={router.asPath}
                  className="flex-1 grid relative"
                >
                  <Suspense fallback={<Loading />}>
                    <Component {...pageProps} />
                  </Suspense>

                  <motion.div
                    className={cn(`${overlapTransitionClass} origin-bottom`)}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Loading />
                  </motion.div>
                  <motion.div
                    className={cn(`${overlapTransitionClass} origin-top`)}
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Loading />
                  </motion.div>
                </motion.main>
              </AnimatePresence>
            </Layout>
          </div>
        </Provider>
      </SessionProvider>
    </NextThemesProvider>
  );
}
