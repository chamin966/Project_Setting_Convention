import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CommonButton from "../components/atom/CommonButton";

function DevTool() {
  const navigate = useNavigate();
  return (
    <>
      <CommonButton label='홈으로' size='small' theme='primary' event={() => navigate('/')}/>
      <StyledMain>
        스타일드 컴포넌트 클래스 네임 없이 사용
        <StyledList>
          <StyledItem>클래스네임 없는 아이템1</StyledItem>
          <StyledItem>클래스네임 없는 아이템2</StyledItem>
          <StyledItem>클래스네임 없는 아이템3</StyledItem>
        </StyledList>
      </StyledMain>
      <StyledMain className='home_main'>
        스타일드 컴포넌트 클래스 네임 사용
        <StyledList className='home_list'>
          <StyledItem className='home_item'>클래스네임 있는 아이템1</StyledItem>
          <StyledItem className='home_item'>클래스네임 있는 아이템2</StyledItem>
          <StyledItem className='home_item'>클래스네임 있는 아이템3</StyledItem>
        </StyledList>
      </StyledMain>
    </>
  );
}

export default DevTool;

const StyledMain = styled.main``;
const StyledList = styled.ul``;
const StyledItem = styled.li``;
