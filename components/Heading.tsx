import { FC } from "react";

interface IHeadingProps {
  tag?: keyof JSX.IntrinsicElements;
  text: string;
  className?: string;
}

const Heading: FC<IHeadingProps> = ({ tag, text, className }) => {
  const Tag = tag || "h1";
  return <Tag className={className}>{text}</Tag>;
};

export default Heading;
