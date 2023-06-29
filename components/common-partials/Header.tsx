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
    <header ref={headerRef} className="border-b border-zinc-600 py-3">
      <Navbar></Navbar>
    </header>
  );
}
