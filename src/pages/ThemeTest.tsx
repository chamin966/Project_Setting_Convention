import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommonButton from "../components/atom/CommonButton";

const ThemeTest = () => {
  const navigate = useNavigate();
  return (
    <>
      <CommonButton
        label="홈으로"
        size="small"
        theme="primary"
        event={() => navigate("/")}
      />
      <Container>title</Container>
    </>
  );
};

export default ThemeTest;

// 외부 파일이 아닌 ThemeProvider로 감싸져 있는 컴포넌트 내에서
// 스타일 코드를 작성하는 경우에는 프롭스로 바로 가져와서 사용 가능
const Container = styled.div`
  background-color: ${(props) => props.theme.style.palette.pink};
`;
