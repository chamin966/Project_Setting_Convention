import { useNavigate } from 'react-router-dom';

function Buttons() {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate('/')}>홈으로</button>
      <div>버튼즈 페이지</div>;
    </>
  );
}

export default Buttons;
