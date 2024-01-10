import { useNavigate } from "react-router-dom";
import CommonButton from "../components/atom/CommonButton";
import styled from "styled-components";
import variables from "../styles/variables";
import { formData } from "../Data/formData";

function CRUDTest() {
  const navigate = useNavigate();
  const data = formData;

  // section-1의 con-7의 순서를 con-8 뒤로 옮기 경우
  const test1 = (dataId, toIndex, to) => {
    //주어진 정보: 시작
    const newData = JSON.parse(JSON.stringify(data));
  };
  // section-1의 column5의 순서를 column-3 앞으로 옮기는 경우
  // section-1의 con-7을 section-2의 column-9로 옮기는 경우
  // section-2의 column-9를 같은 섹션 row-3으로 옮기는 경우
  // section-2의 column-9를 section-1의 row-1으로 옮기는 경우
  // section-1의 con-1을 삭제하는 경우
  // section-1의 column-1을 삭제하는 경우
  // section-1의 row-1을 삭제하는 경우

  return (
    <Container>
      <CommonButton
        label={"홈으로"}
        size={"small"}
        theme={"primary"}
        event={() => navigate("/")}
      />
      <CommonButton
        label={"con-1을 찾는 경우"}
        size={"small"}
        theme={"primary"}
      />
    </Container>
  );
}

const Container = styled.div`
  ${variables.flex("column", "start", "flex-start", "20px")}
`;

export default CRUDTest;
