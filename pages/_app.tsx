import type { AppProps } from "next/app";
import "../styles/global.scss";
import Layout from "@/components/Layout";
import Cursor from "../components/Cursor";
// store
import { store } from "@/app/store";
import { Provider } from "react-redux";
// next auth
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Cursor />
        <div className="min-h-screen flex flex-col justify-between">
          <Layout>
            <main className="flex-1">
              <Component {...pageProps} />
            </main>
          </Layout>
        </div>
      </Provider>
    </SessionProvider>
  );
}
