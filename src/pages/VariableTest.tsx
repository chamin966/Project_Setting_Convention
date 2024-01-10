import styled from "styled-components";
import CommonButton from "../components/atom/CommonButton";
import { useNavigate } from "react-router-dom";
import variables from "../styles/variables";
import theme from "../styles/theme";

const VariableTest = () => {
  const navigate = useNavigate();
  return (
    <>
      <CommonButton
        label="홈으로"
        size="small"
        theme="primary"
        event={() => navigate("/")}
      />
      <span>variables.flex()</span>
      <ButtonsContainer1>
        <CommonButton />
        <CommonButton label="버튼2" size="medium" theme="secondary" />
        <CommonButton label="버튼3" size="small" theme="pink" />
      </ButtonsContainer1>
      <span>variables.flex('', 'space-between')</span>
      <ButtonsContainer2>
        <CommonButton label="버튼1" size="large" theme="primary" />
        <CommonButton label="버튼2" size="medium" theme="secondary" />
        <CommonButton label="버튼3" size="small" theme="pink" />
      </ButtonsContainer2>
      <span>variables.flex('column', 'space-between', 'flex-end', '20px')</span>
      <ButtonsContainer3>
        <CommonButton label="버튼1" size="large" theme="primary" />
        <CommonButton label="버튼2" size="medium" theme="secondary" />
        <CommonButton label="버튼3" size="small" theme="pink" />
      </ButtonsContainer3>
    </>
  );
};

const ButtonsContainer1 = styled.div`
  ${variables.flex()}
  background-color: ${(props) => props.theme.style.palette.grey};
  // ${(props) => props.theme.variables.flex()}
`;

const ButtonsContainer2 = styled.div`
  ${variables.flex("", "space-between")}
  background-color: ${theme.palette.pink};
`;

const ButtonsContainer3 = styled.div`
  ${variables.flex("column", "space-between", "flex-end", "20px")}
`;
export default VariableTest;
