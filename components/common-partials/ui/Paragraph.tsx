import { FC } from "react";
import { cva } from "class-variance-authority";

interface ParagraphProps {}

const paragraphVariants = cva("w");

const Paragraph: FC<ParagraphProps> = () => {
  return <div className="text-">Paragrapsh</div>;
};

export default Paragraph;
