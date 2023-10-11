import { navigation } from "./src/configs/navigation-route";

import { withAuth } from "next-auth/middleware";

const paths = navigation.filter((i) => i.isPrivate).map((i) => i.path);
export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // verify token and return a boolean
      return !!token;
    },
  },
});

export const config = { matcher: ["/search"] };
