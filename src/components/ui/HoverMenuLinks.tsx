import { cn } from "@/src/lib/merge-classes-utils";
import Link from "next/link";
// models
import { INavigationData } from "@/src/models/navigation-route.model";

const HoverMenuLinks = ({ title, path, nestedLinks }: INavigationData) => {
  const linkMenuClasses = {
    menuWrap: "link-menu relative px-8 self-stretch flex items-center",
    menuTitleWrap: "flex items-center gap-3",
    menuArrow:
      "link-nested-arrow transition-all inline-block relative w-[7px] h-[7px] after:absolute after:bg-white after:h-full after:w-[1px] after:-rotate-45 before:absolute before:bg-white before:h-full before:w-[1px] before:rotate-45 before:translate-x-1",
    linkMenuNested:
      "link-nested-menu absolute top-full bg-black  w-full rounded-sm m-0  shadow-lg shadow-black-0 z-10",
    linkMenuItemNested: "link-nested-item border-b m-0",
    link: "px-1 py-2 inline-block bg-black transition-all  w-full text-white after:transition-all after:bg-transparent after:absolute after:w-full after:h-full after:left-0 after:top-0 hover:after:bg-white/[0.1]",
  };
  return (
    <div className={`${cn(linkMenuClasses.menuWrap)}`}>
      <div className={`${cn(linkMenuClasses.menuTitleWrap)}`}>
        <span className="link-nested-title text-white">{title}</span>
        <span className={`${cn(linkMenuClasses.menuArrow)}`}></span>
      </div>
      <ul className={`${cn(linkMenuClasses.linkMenuNested)}`}>
        {nestedLinks?.map((item, index) => {
          return (
            <li
              key={index}
              className={`${cn(linkMenuClasses.linkMenuItemNested)}`}
              style={{ transitionDelay: index / 10 + "s" }}
            >
              <Link
                className={`${cn(linkMenuClasses.link)}`}
                href={`${path}${item.path}`}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HoverMenuLinks;
