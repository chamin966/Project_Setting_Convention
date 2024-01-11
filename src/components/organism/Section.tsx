import styled from 'styled-components';
import { useCallback, useState } from 'react';
import update from 'immutability-helper';
import { ColumnSample, IColumn } from '../../Data/DndSamples';
import Column from '../molecule/Column';

function RowTest() {
  const [columns, setColumns] = useState(ColumnSample);

  const moveColumn = useCallback((dragIndex: number, hoverIndex: number) => {
    setColumns((prevControls: IColumn[]) =>
      update(prevControls, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevControls[dragIndex] as IColumn],
        ],
      }),
    );
  }, []);

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

  return (
    <StyledRow>
      <StyledRowTitle>Row’s</StyledRowTitle>
      <StyledRowsBox>
        {columns.map((column, idx) => renderColumn(column, idx))}
      </StyledRowsBox>
    </StyledRow>
  );
}

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
