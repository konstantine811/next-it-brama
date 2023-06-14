import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { onHover } from "@/slices/cursorSlices";
// components
import Heading from "./Heading";
import { signOut, useSession } from "next-auth/react";

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
  const { data: sessionData } = useSession();
  const linkClassNames =
    "text-white hover:text-slate-300  hover:duration-300 font-light after:w-full relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:inline-block after:scale-x-0 after:ease after:duration-150 hover:after:scale-x-100";
  const btnClassNames =
    "px-4 py-2 text-white rounded-2xl shadow-md shadow-zinc-950 bg-black";
  const { pathname } = useRouter();
  return (
    <div className="flex justify-between items-center container">
      <Heading className="text-white" text="Logo" tag="h3"></Heading>
      <nav className="flex gap-5 items-center">
        {navigation.map(({ id, title, path }) => {
          return (
            <Link
              key={id}
              href={path}
              onMouseEnter={() => {
                dispatch(onHover(true));
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
            className={btnClassNames}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </button>
        ) : (
          <Link className={btnClassNames} href="/api/auth/signin">
            Sign in
          </Link>
        )}
      </nav>
    </div>
  );
}
