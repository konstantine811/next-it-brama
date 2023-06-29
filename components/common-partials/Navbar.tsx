import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  onHover,
  onSizeHoverElement,
  onCenterHoverElement,
} from "@/slices/cursorSlices";
// components
import { signOut, useSession } from "next-auth/react";
import { createRef, useMemo, useRef } from "react";

const navigation = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "Blender Sheet",
    path: "/blenderCheatSheet",
  },
  {
    id: 3,
    title: "Search",
    path: "/search",
  },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const { data: sessionData, status } = useSession();
  const linkRefs = useMemo(
    () => navigation.map(() => createRef<HTMLAnchorElement>()),
    []
  );
  const signInBtnRef = useRef<HTMLAnchorElement>(null);
  const signOutBtnRef = useRef<HTMLButtonElement>(null);
  const linkClassNames =
    "text-white hover:text-slate-300  hover:duration-300 font-light after:w-full relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:inline-block after:scale-x-0 after:ease after:duration-150 hover:after:scale-x-100";
  const btnClassNames =
    "px-4 py-2 text-white rounded-2xl shadow-md shadow-zinc-950 bg-black";
  const { pathname } = useRouter();
  return (
    <div className="flex justify-between items-center container">
      <h3 className="text-white">Logo</h3>
      <nav className="flex gap-5 items-center">
        {navigation.map(({ id, title, path }, index) => {
          return (
            <Link
              key={id}
              href={path}
              ref={linkRefs[index] as any}
              onMouseEnter={(e) => {
                dispatch(onHover(true));
                if (linkRefs[index]) {
                  const ref = linkRefs[index].current;
                  if (ref) {
                    const { offsetWidth, offsetLeft } = ref;
                    const center = offsetLeft + offsetWidth / 2;
                    dispatch(onCenterHoverElement(center));
                    dispatch(onSizeHoverElement(offsetWidth));
                  }
                }
              }}
              onMouseLeave={() => {
                dispatch(onHover(false));
              }}
              className={`${linkClassNames} ${
                pathname === path
                  ? "after:scale-x-100 after:bg-white"
                  : "after:bg-slate-700"
              }`}
            >
              {title}
            </Link>
          );
        })}
        {sessionData ? (
          <button
            ref={signOutBtnRef}
            onMouseEnter={(e) => {
              dispatch(onHover(true));
              if (signOutBtnRef) {
                const ref = signOutBtnRef.current;
                if (ref) {
                  const { offsetWidth, offsetLeft } = ref;
                  const center = offsetLeft + offsetWidth / 2;
                  dispatch(onCenterHoverElement(center));
                  dispatch(onSizeHoverElement(offsetWidth));
                }
              }
            }}
            onMouseLeave={() => {
              dispatch(onHover(false));
            }}
            className={btnClassNames}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </button>
        ) : (
          <Link
            ref={signInBtnRef}
            onMouseEnter={(e) => {
              dispatch(onHover(true));
              if (signInBtnRef) {
                const ref = signInBtnRef.current;
                if (ref) {
                  const { offsetWidth, offsetLeft } = ref;
                  const center = offsetLeft + offsetWidth / 2;
                  dispatch(onCenterHoverElement(center));
                  dispatch(onSizeHoverElement(offsetWidth));
                }
              }
            }}
            onMouseLeave={() => {
              dispatch(onHover(false));
            }}
            className={btnClassNames}
            href="/api/auth/signin"
          >
            Sign in
          </Link>
        )}
      </nav>
    </div>
  );
}
