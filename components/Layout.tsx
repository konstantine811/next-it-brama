import { FC, ReactNode } from "react";
// components
import Footer from "./common-partials/Footer";
import Header from "./common-partials/Header";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
};

export default Layout;
