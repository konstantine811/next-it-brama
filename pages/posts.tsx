import Heading from "@/components/Heading";
import styles from "../styles/Post.module.scss";

const Posts = () => {
  return (
    <>
      <Heading text="Posts list: "></Heading>
      <p className={styles.wrapper}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
        repellat beatae. Delectus odio saepe vitae earum modi officiis autem?
        Eaque deserunt autem at ullam officia nostrum itaque facilis, explicabo
        fuga.
      </p>
    </>
  );
};

export default Posts;
