import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { ItemTypes } from '../../Data/itemType';
import { Identifier, XYCoord } from 'dnd-core';
import styled from 'styled-components';

// 컨트롤 컴포넌트의 매개변수를 정의합니다.
export interface ControlProps {
  id: string;
  text: string;
  index: number;
  moveControl: (dragIndex: number, hoverIndex: number) => void;
}

// Styled 컴포넌트에서 사용될 prop 타입을 정의합니다.
interface StyledControlProps {
  isDragging: boolean;
}

// 드래그 항목의 매개변수를 정의합니다.
interface DragColItem {
  index: number;
  id: string;
}

// 컨트롤 컴포넌트 정의
function Control({ id, text, index, moveControl }: ControlProps) {
  // 컨트롤의 DOM 요소에 대한 참조를 생성합니다.
  const ref = useRef<HTMLDivElement>(null);

  // 드래그 앤 드롭을 위한 훅을 사용합니다.
  const [{ handlerId }, drop] = useDrop<
    DragColItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CONTROL,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item: DragColItem, monitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      // 동일한 항목을 교체하지 않습니다.
      if (dragIndex === hoverIndex) return;

      // 화면 상의 항목의 직사각형 영역을 결정합니다.
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // 수직 중앙 위치를 확인합니다.
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // 마우스 위치를 확인합니다.
      const clientOffset = monitor.getClientOffset();

      // 상단에서의 픽셀 값 확인
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      // 마우스가 항목의 높이의 절반 이상 지날 때만 이동합니다.
      // 아래로 드래그할 때는 커서가 50% 이상 아래로 내려갈 때만 이동합니다.
      // 위로 드래그할 때는 커서가 50% 이상 위로 올라갈 때만 이동합니다.
      // 그렇지 않으면 이동하지 않습니다.

      // 아래로 드래그
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;

      // 위로 드래그
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;

      // 실제로 이동 수행
      moveControl(dragIndex, hoverIndex);

      // 참고: 여기서 모니터 항목을 직접 변경합니다!
      // 일반적으로 불변성을 유지하는 것이 좋습니다.
      // 그러나 성능 이유로 여기서 인덱스 조회를 피하기 위해 여기에서 변경하고 있습니다.
      // 나중에 상태 관리로 변경해야 할 예정
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CONTROL,
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // 드래그 앤 드롭 기능을 컨트롤의 참조와 결합합니다.
  drag(drop(ref));

  // 스타일드 컴포넌트를 사용하여 컨트롤 컴포넌트를 렌더링합니다.
  return (
    <StyledControl
      ref={ref}
      isDragging={isDragging}
      data-handler-id={handlerId}
    >
      {text}
    </StyledControl>
  );
}

// 기본 내보내기로 컨트롤 컴포넌트 내보내기
export default Control;

// 특정 스타일을 기반으로 한 Styled 컴포넌트 정의
const StyledControl = styled.div<StyledControlProps>`
  width: 100%;
  border: 1px dashed gray;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  background-color: gray;
  cursor: move;
  opacity: ${(props) => (props.isDragging ? '0.5' : '1')};
`;
