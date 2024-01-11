import CommonButton from '../components/atom/CommonButton';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';

import { testData } from '../Data/testData';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Vertical from '../components/molecule/Vertical';
import ColumnTest from '../components/molecule/ColumnTest';
import Row from '../components/organism/Row';

function DnDTest() {
  const navigate = useNavigate();
  return (
    <div>
      <CommonButton
        label={'홈으로'}
        size={'small'}
        theme={'primary'}
        event={() => navigate('/')}
      />
      <div>Dnd Test</div>
      <DndProvider backend={HTML5Backend}>
        {/*<Vertical />*/}
        {/*<ColumnTest />*/}
        <Row />
      </DndProvider>
    </div>
  );
}
export default DnDTest;
