// 필요한 종속성 및 컴포넌트를 가져옵니다.
import styled from "styled-components";
import { useCallback, useState } from "react";
import update from "immutability-helper";
import ControlVertical from "../atom/ControlVertical";
import { IControl, controlsHorizontalSample } from "../../Data/DndSamples";

// 행의 상태를 위한 인터페이스를 정의합니다. 이는 컨트롤 배열로 이루어져 있습니다.
export interface RowState {
  controls: IControl[];
}

// Vertical 컴포넌트를 정의합니다.
function Vertical() {
  // 행 내의 컨트롤을 관리하기 위한 상태 훅입니다. DndSample1 데이터로 초기화됩니다.
  const [controls, setControls] = useState(controlsHorizontalSample);

  // 드래그 앤 드롭 중 컨트롤 이동을 처리하는 콜백 함수입니다.
  const moveControlsHorizontal = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      // 컨트롤 배열 내에서 컨트롤을 이동하기 위해 immutability-helper를 사용하여 상태를 업데이트합니다.
      setControls((prevControls: IControl[]) =>
        update(prevControls, {
          $splice: [
            [dragIndex, 1], // 드래그된 컨트롤을 제거합니다.
            [hoverIndex, 0, prevControls[dragIndex] as IControl], // 드래그된 컨트롤을 hoverIndex에 삽입합니다.
          ],
        }),
      );
    },
    [],
  );

  // 개별 컨트롤을 렌더링하는 콜백 함수입니다.
  const renderControlsHorizontal = useCallback(
    (control: { id: string; text: string }, index: number) => {
      return (
        <ControlVertical
          key={control.id}
          id={control.id}
          text={control.text}
          index={index}
          moveControlVertical={moveControlsHorizontal}
        />
      );
    },
    [],
  );

  // 행 컴포넌트를 렌더링하며 컨트롤 목록을 포함합니다.
  return (
    <StyledRow>
      {controls.map((control, idx) => renderControlsHorizontal(control, idx))}
    </StyledRow>
  );
}

// Vertical 컴포넌트를 기본 내보내기로 내보냅니다.
export default Vertical;

const StyledRow = styled.div`
  width: 1200px;
`;
