import { useNavigate } from 'react-router-dom';
import CommonButton from '../components/atom/CommonButton';

function Buttons() {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate('/')}>홈으로</button>
      <CommonButton label='버튼1' size='large' theme='primary' />
      <CommonButton label='버튼2' size='medium' theme='secondary' />
      <CommonButton label='버튼3' size='small' theme='pink' />
    </>
  );
}

export default Buttons;
