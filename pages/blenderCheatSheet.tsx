import TextSplitAnimation from "@/components/TextAnimation";
// data
import { dataObjectModeTable } from "@/data/blender-page/blender-cheat-sheet.data";
// components
import FadeInElement from "@/components/animation-wrapper/FadeInElement";
import Table from "@/components/Table";

const BlenderCheatSheet = () => {
  return (
    <div className="container mt-10">
      <h1 className="text-3xl text-white uppercase text-center">
        <TextSplitAnimation>Blender cheat sheet</TextSplitAnimation>
      </h1>
      <FadeInElement>
        <Table
          wrapClasses="max-w-5xl mx-auto mt-5"
          dataTable={dataObjectModeTable}
        ></Table>
      </FadeInElement>
    </div>
  );
};

export default BlenderCheatSheet;
