import styled from 'styled-components';
import { useCallback, useState } from 'react';
import update from 'immutability-helper';
import { ColumnSample, IColumn } from '../../Data/DndSamples';
import Column from '../molecule/Column';

// RowTest 컴포넌트 정의
function RowTest() {
  // ColumnSample을 초기 상태로 가지는 columns 상태 훅
  const [columns, setColumns] = useState(ColumnSample);

  // 드래그 앤 드롭으로 컬럼 이동을 처리하는 콜백 함수
  const moveColumn = useCallback((dragIndex: number, hoverIndex: number) => {
    // immutability-helper를 사용하여 상태 업데이트
    setColumns((prevControls: IColumn[]) =>
      update(prevControls, {
        $splice: [
          [dragIndex, 1], // 드래그된 컬럼을 제거
          [hoverIndex, 0, prevControls[dragIndex] as IColumn], // 드래그된 컬럼을 hoverIndex에 삽입
        ],
      }),
    );
  }, []);

  // 각 컬럼을 렌더링하는 콜백 함수
  const renderColumn = useCallback((column: IColumn, index: number) => {
    return (
      <Column
        key={column.id}
        id={column.id}
        text={column.text}
        index={index}
        moveColumn={moveColumn}
        controls={column.controls}
      />
    );
  }, []);

  // Row 컴포넌트 렌더링
  return (
    <StyledRow>
      <StyledRowTitle>Row’s</StyledRowTitle>
      <StyledRowsBox>
        {columns.map((column, idx) => renderColumn(column, idx))}
      </StyledRowsBox>
    </StyledRow>
  );
}

// RowTest 컴포넌트를 내보냅니다.
export default RowTest;

const StyledRow = styled.div`
  width: 1200px;
`;

const StyledRowTitle = styled.div`
  background-color: rosybrown;
  padding: 10px;
`;

const StyledRowsBox = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
  background-color: rosybrown;
`;
