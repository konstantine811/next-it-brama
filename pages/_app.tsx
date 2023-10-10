import type { AppProps } from "next/app";
import "../styles/global.scss";
import Layout from "@components/Layout";
// import Cursor from "../components/common-partials/Cursor";
import { Cursor } from "react-creative-cursor";
import "react-creative-cursor/dist/styles.css";
// store
import { store } from "@store/slices/index.store";
import { Provider } from "react-redux";
// next auth
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
// 1. Import `createTheme`
import { ThemeProvider as NextThemesProvider } from "next-themes";

import React from "react";
React.useLayoutEffect = React.useEffect;

// 2. Call `createTheme` and pass your custom values
export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
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
              <main className="flex-1 grid">
                <Component {...pageProps} />
              </main>
            </Layout>
          </div>
        </Provider>
      </SessionProvider>
    </NextThemesProvider>
  );
}
