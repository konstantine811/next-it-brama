import { FC } from "react";

interface IHeadingProps {
  tag?: keyof JSX.IntrinsicElements;
  text: string;
}

const Heading: FC<IHeadingProps> = ({ tag, text }) => {
  const Tag = tag || "h1";
  return <Tag className="text-white">{text}</Tag>;
};

export default Heading;
