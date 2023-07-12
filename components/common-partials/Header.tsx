import { onChangeHeaderHeight } from "@/slices/commonSlice";
import Navbar from "./Navbar";
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Header() {
  const headerRef = useRef<HTMLBaseElement>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const headerHeight = headerRef.current?.offsetHeight;
    dispatch(onChangeHeaderHeight(headerHeight ? headerHeight : 0));
  }, [headerRef, dispatch]);
  return (
    <header
      className="shadow-md shadow-black-0 sticky top-0 z-10 backdrop-blur-lg"
      ref={headerRef}
    >
      <Navbar></Navbar>
    </header>
  );
}
