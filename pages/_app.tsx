import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import "../styles/global.scss";
import Cursor from "../components/Cursor";
// store
import { store } from "@/app/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  );
}
