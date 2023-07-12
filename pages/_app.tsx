import type { AppProps } from "next/app";
import "../styles/global.scss";
import Layout from "@/components/Layout";
// import Cursor from "../components/common-partials/Cursor";
import { Cursor } from "react-creative-cursor";
import "react-creative-cursor/dist/styles.css";
// store
import { store } from "@/slices/index.store";
import { Provider } from "react-redux";
// next auth
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
// 1. Import `createTheme`
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import React from "react";
React.useLayoutEffect = React.useEffect;

// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: "light",
  theme: {},
});

const darkTheme = createTheme({
  type: "dark",
  theme: {},
});

export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <NextThemesProvider
          defaultTheme="dark"
          attribute="class"
          value={{
            light: lightTheme.className,
            dark: darkTheme.className,
          }}
        >
          <NextUIProvider>
            {/* <Cursor /> */}
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
          </NextUIProvider>
        </NextThemesProvider>
      </Provider>
    </SessionProvider>
  );
}
