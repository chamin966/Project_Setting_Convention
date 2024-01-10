// 필요한 종속성 및 컴포넌트를 가져옵니다.
import styled from "styled-components";
import { useCallback, useRef, useState } from "react";
import update from "immutability-helper";
import { IControl, ControlsSample } from "../../Data/DndSamples";
import Control from "../atom/Control";
import { useDrag, useDrop } from "react-dnd";
import { Identifier, XYCoord } from "dnd-core";
import { ItemTypes } from "../../Data/itemType";

// 행의 상태를 위한 인터페이스를 정의합니다. 이는 컨트롤 배열로 이루어져 있습니다.
export interface ColumnState {
  controls: IControl[];
}

export interface ColumnProps {
  id: string;
  text: string;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  controls: IControl[];
}

interface StyledColumnProps {
  isDragging: boolean;
}

interface DragColumnItem {
  index: number;
  id: string;
  controls: IControl[];
}

//props: { id, text, index, moveColumn, controls }
// Vertical 컴포넌트를 정의합니다.
function Column(props: ColumnProps) {
  // 행 내의 컨트롤을 관리하기 위한 상태 훅입니다. DndSample1 데이터로 초기화됩니다.
  const [controls, setControls] = useState(props.controls);
  // 컨트롤의 DOM 요소에 대한 참조를 생성합니다.
  const ref = useRef<HTMLDivElement>(null);

  // 드래그 앤 드롭을 위한 훅을 사용합니다.
  const [{ handlerId }, drop] = useDrop<
    DragColumnItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.COLUMN,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item: DragColumnItem, monitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = props.index;

      // 동일한 항목을 교체하지 않습니다.
      if (dragIndex === hoverIndex) return;

      // 화면 상의 항목의 직사각형 영역을 결정합니다.
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // 수직 중앙 위치를 확인합니다.
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // 마우스 위치를 확인합니다.
      const clientOffset = monitor.getClientOffset();

      // 상단에서의 픽셀 값 확인
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // 마우스가 항목의 높이의 절반 이상 지날 때만 이동합니다.
      // 아래로 드래그할 때는 커서가 50% 이상 아래로 내려갈 때만 이동합니다.
      // 위로 드래그할 때는 커서가 50% 이상 위로 올라갈 때만 이동합니다.
      // 그렇지 않으면 이동하지 않습니다.

      // 아래로 드래그
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      // 위로 드래그
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      // 실제로 이동 수행
      props.moveColumn(dragIndex, hoverIndex);

      // 참고: 여기서 모니터 항목을 직접 변경합니다!
      // 일반적으로 불변성을 유지하는 것이 좋습니다.
      // 그러나 성능 이유로 여기서 인덱스 조회를 피하기 위해 여기에서 변경하고 있습니다.
      // 나중에 상태 관리로 변경해야 할 예정
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COLUMN,
    item: () => ({ id: props.id, index: props.index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // 드래그 앤 드롭 기능을 컨트롤의 참조와 결합합니다.
  drag(drop(ref));

  // 스타일드 컴포넌트를 사용하여 컨트롤 컴포넌트를 렌더링합니다.

  // 드래그 앤 드롭 중 컨트롤 이동을 처리하는 콜백 함수입니다.
  const moveControls = useCallback((dragIndex: number, hoverIndex: number) => {
    // 컨트롤 배열 내에서 컨트롤을 이동하기 위해 immutability-helper를 사용하여 상태를 업데이트합니다.
    setControls((prevControls: IControl[]) =>
      update(prevControls, {
        $splice: [
          [dragIndex, 1], // 드래그된 컨트롤을 제거합니다.
          [hoverIndex, 0, prevControls[dragIndex] as IControl], // 드래그된 컨트롤을 hoverIndex에 삽입합니다.
        ],
      }),
    );
  }, []);

  // 개별 컨트롤을 렌더링하는 콜백 함수입니다.
  const renderControls = useCallback(
    (control: { id: string; text: string }, index: number) => {
      return (
        <Control
          key={control.id}
          id={control.id}
          text={control.text}
          index={index}
          moveControl={moveControls}
        />
      );
    },
    [],
  );

  // 행 컴포넌트를 렌더링하며 컨트롤 목록을 포함합니다.
  return (
    <StyledColumn ref={ref} isDragging={isDragging} data-handler-id={handlerId}>
      <StyledColumnTitle>{props.text}</StyledColumnTitle>
      <StyledControlsBox>
        {controls.map((control, idx) => renderControls(control, idx))}
      </StyledControlsBox>
    </StyledColumn>
  );
}

// Vertical 컴포넌트를 기본 내보내기로 내보냅니다.
export default Column;

const StyledColumn = styled.div<StyledColumnProps>`
  width: 1200px;
  cursor: move;
  opacity: ${(props) => (props.isDragging ? "0.5" : "1")};
  margin-bottom: 0.5rem;
`;

const StyledColumnTitle = styled.div`
  background-color: darkseagreen;
  padding: 10px;
`;

const StyledControlsBox = styled.div`
  display: flex;
  width: 100%;
  background-color: darkseagreen;
  padding: 10px;
`;
