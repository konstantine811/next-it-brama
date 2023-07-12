import TextSplitAnimation from "@/components/TextAnimation";
// data
import { dataObjectModeTable } from "@/data/blender-page/blender-cheat-sheet.data";
// components
import FadeInElement from "@/components/animation-wrapper/FadeInElement";
import Table from "@/components/common-partials/Table";

const BlenderCheatSheet = () => {
  return (
    <div className="container mt-10">
      <TextSplitAnimation size="h1" as="h1" className="m-auto">
        Blender cheat sheet
      </TextSplitAnimation>
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
