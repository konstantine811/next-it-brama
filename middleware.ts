import { navigation } from "./src/configs/navigation-route";

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const paths = navigation.filter((i) => i.isPrivate).map((i) => i.path);
export default withAuth(
  function middleware(req) {
    // some actions here
    /*  console.log(req.nextauth); */
    if (
      req.nextUrl.pathname === "/search" &&
      req.nextauth.token?.role !== "admin"
    ) {
      return new NextResponse("You are not authorized!");
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // verify token and return a boolean
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/search"] };
