import { ReactNode } from "react";
// components
import Footer from "./common-partials/Footer";
import Header from "./common-partials/Header";
import { NextPage } from "next";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: NextPage<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
};

export default Layout;
