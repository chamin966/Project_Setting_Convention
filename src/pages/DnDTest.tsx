import CommonButton from "../components/atom/CommonButton";
import { useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";

import { testData } from "../Data/testData";
import { HTML5Backend } from "react-dnd-html5-backend";
import Row from "../components/molecule/Row";

function DnDTest() {
  const navigate = useNavigate();
  return (
    <div>
      <CommonButton
        label={"홈으로"}
        size={"small"}
        theme={"primary"}
        event={() => navigate("/")}
      />
      <div>Dnd Test</div>
      <DndProvider backend={HTML5Backend}>
        <Row />
      </DndProvider>
    </div>
  );
}
export default DnDTest;
