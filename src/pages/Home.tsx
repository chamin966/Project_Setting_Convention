import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate('/devTool')}>
        개발자 도구 클래스 네임 비교 페이지
      </button>
      <button onClick={() => navigate('/buttons')}>버튼즈 페이지</button>
    </>
  );
}

export default Home;
