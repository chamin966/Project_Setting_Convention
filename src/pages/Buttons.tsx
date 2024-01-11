import CommonButton from '../components/atom/CommonButton';
import { useNavigate } from 'react-router-dom';

function Buttons() {
  const navigate = useNavigate();
  return (
    <>
      <CommonButton
        label="홈으로"
        size="small"
        theme="primary"
        event={() => navigate('/')}
      />
      <CommonButton label="버튼1" size="large" theme="primary" />
      <CommonButton label="버튼2" size="medium" theme="secondary" />
      <CommonButton label="버튼3" size="small" theme="pink" />
    </>
  );
}

export default Buttons;
