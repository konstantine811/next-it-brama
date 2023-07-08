import { INavigationData } from "@/models/navigation-route.model";

export const navigation: INavigationData[] = [
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
    isPrivate: true,
  },
  {
    id: 4,
    title: "AI Speech",
    path: "/ai-speech",
  },
];
