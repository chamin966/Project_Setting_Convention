// 필요한 종속성 및 컴포넌트를 가져옵니다.
import styled from "styled-components";
import { useCallback, useState } from "react";
import update from "immutability-helper";
import { ColumnSample, IColumn } from "../../Data/DndSamples";
import Column from "../molecule/Column";

// Vertical 컴포넌트를 정의합니다.
function Row() {
  // 행 내의 컨트롤을 관리하기 위한 상태 훅입니다. DndSample1 데이터로 초기화됩니다.
  const [columns, setColumns] = useState(ColumnSample);

  // 드래그 앤 드롭 중 컨트롤 이동을 처리하는 콜백 함수입니다.
  const moveColumn = useCallback((dragIndex: number, hoverIndex: number) => {
    // 컨트롤 배열 내에서 컨트롤을 이동하기 위해 immutability-helper를 사용하여 상태를 업데이트합니다.
    setColumns((prevControls: IColumn[]) =>
      update(prevControls, {
        $splice: [
          [dragIndex, 1], // 드래그된 컨트롤을 제거합니다.
          [hoverIndex, 0, prevControls[dragIndex] as IColumn], // 드래그된 컨트롤을 hoverIndex에 삽입합니다.
        ],
      }),
    );
  }, []);

  // 개별 컨트롤을 렌더링하는 콜백 함수입니다.
  // const renderColumn = useCallback(
  //   (control: { id: string; text: string }, index: number) => {
  //     return (
  //       <Column
  //         key={control.id}
  //         id={control.id}
  //         text={control.text}
  //         index={index}
  //         moveColumn={moveColumn}
  //       />
  //     );
  //   },
  //   [],
  // );

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

  // 행 컴포넌트를 렌더링하며 컨트롤 목록을 포함합니다.
  return (
    <StyledRow>
      <StyledRowTitle>컬럼</StyledRowTitle>
      <StyledRowsBox>
        {columns.map((column, idx) => renderColumn(column, idx))}
      </StyledRowsBox>
    </StyledRow>
  );
}

// Vertical 컴포넌트를 기본 내보내기로 내보냅니다.
export default Row;

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
