import { INavigationData } from "@/src/models/navigation-route.model";

export const navigation: INavigationData[] = [
  /*   {
    title: "Home",
    path: "/",
  }, */
  {
    title: "Three Web",
    path: "/three-scenes",
    nestedLinks: [
      {
        title: "Personal game",
        path: "/personal-game",
      },
      {
        title: "First Scene",
        path: "/first-scene",
      },
      {
        title: "Second Simple Scene with ",
        path: "/second-scene",
      },
    ],
  },
  {
    title: "Blender Sheet",
    path: "/blenderCheatSheet",
  },
  {
    title: "Search",
    path: "/search",
    isPrivate: true,
  },
  {
    title: "AI Speech",
    path: "/ai-speech",
  },
];
