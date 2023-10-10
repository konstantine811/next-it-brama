import Link from "next/link";
import { useRouter } from "next/router";
// components
import { signOut, useSession } from "next-auth/react";
import { createRef, useMemo } from "react";
import { navigation } from "@configs/navigation-route";
import { AcmeLogo } from "@components/common-partials/svg-icons/A-icon";
import HoverMenuLinks from "@components/ui/HoverMenuLinks";
import TextWrapper from "../ui/TextWrapper";

export default function Navbar() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const linkRefs = useMemo(
    () => navigation.map(() => createRef<HTMLAnchorElement>()),
    []
  );
  const linkClassNames =
    "text-white hover:text-slate-300  hover:duration-300 font-light after:w-full relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:inline-block after:scale-x-0 after:ease after:duration-150 hover:after:scale-x-100 p-8";
  const btnClassNames =
    "d-block px-4 py-2 text-white rounded-2xl shadow-md shadow-zinc-950 bg-black";
  const { pathname } = useRouter();
  return (
    <div className="flex justify-between items-center container">
      <div className="flex gap-2 items-center">
        <AcmeLogo />
        <TextWrapper as="h3">C.A.</TextWrapper>
      </div>
      <nav className="flex items-center">
        {navigation.map(({ title, path, nestedLinks }, index) => {
          if (nestedLinks && nestedLinks.length) {
            return (
              <HoverMenuLinks
                path={path}
                title={title}
                nestedLinks={nestedLinks}
                key={index}
              ></HoverMenuLinks>
            );
          }
          return (
            <Link
              key={index}
              data-cursor-magnetic
              data-cursor-size="40px"
              href={path}
              ref={linkRefs[index] as any}
              onClick={(e) => {
                e.preventDefault();
                if (path !== pathname) {
                  router.push(path);
                }
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
            data-cursor-magnetic
            data-cursor-size="40px"
            className={btnClassNames}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </button>
        ) : (
          <Link
            data-cursor-magnetic
            data-cursor-size="40px"
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
