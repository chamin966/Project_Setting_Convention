import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Home() {
  const navigate = useNavigate();
  return (
    <StyledHome>
      <button onClick={() => navigate('/devTool')}>
        개발자 도구 클래스 네임 비교 페이지
      </button>
      <button onClick={() => navigate('/buttons')}>버튼즈 페이지</button>
    </StyledHome>
  );
}

export default Home;

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 20rem;
`;
